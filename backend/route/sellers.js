require("dotenv").config();

const router = require("express").Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// const nodemailer = require('nodemailer');
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

const authMiddleware = require("../middleware/auth");
const pool = require("../database/connection");
const sendMail = require("../utils/nodemailer");

// company registration

router.get("/", async (req, res) => {
    console.log("hitting the backend")
    return res.json({ message: "hitting the backend", redirectTo: "/register/email-otp/verification" }).status(200);
})

router.post('/register', async (req, res) => {
    const { legalName, email, password } = req.body;

    try {
        // Check if seller already exists
        const seller = await pool.query('SELECT * FROM "sellersInfo" WHERE email = $1', [email]);
        if (seller.rows.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new seller into the database
        const newSeller = await pool.query(
            'INSERT INTO "sellersInfo" ("legalName", email, password, step) VALUES ($1, $2, $3, 1) RETURNING *',
            [legalName, email, hashedPassword]
        );

        // generate the otp 

        const otp = crypto.randomInt(100000, 999999).toString();
        const tokenExpires = new Date(Date.now() + 300000); // 5 minutes

        console.log({ location: "/register", otp })

        // send the otp to the register email

        const subject = 'Verify Your Email';
        const text = `Hello ${fullname}, Please verify your email.`;
        const html = `<p>Hello <strong>${fullname}</strong>, this is otp - ${otp}</p>`;

        await sendMail(email, subject, text, html);

        // insert the otp in the databse 

        await pool.query(
            'UPDATE "sellersInfo" SET "verificationToken" = $1, "verificationTokenExpires" = $2 WHERE email = $3',
            [otp, tokenExpires, email]
        );

        res.json({ message: "Please verify the otp send to you register email", redirectTo: `/registration/email-otp/verification?seedId=${newSeller.rows[0].id}&email=${email}&step=2` });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// verify the opt send to the seller email

router.post('/verify-email', async (req, res) => {
    const { sellerId, otp } = req.body;

    try {
        // Check if the seller exists
        const seller = await pool.query('SELECT * FROM "sellersInfo" WHERE id = $1', [sellerId]);
        if (seller.rows.length === 0) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        // Check if the OTP matches and is not expired
        if (seller.rows[0].verificationToken !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        } else if (new Date(seller.rows[0].verificationTokenExpires) < new Date()) {
            return res.status(400).json({ message: 'OTP Expired' });
        }

        // update the verification details
        await pool.query(
            'UPDATE "sellersInfo" SET "verificationToken" = NULL, "verificationTokenExpires" = NULL WHERE id = $1',
            [sellerId]
        );

        // Update the step to indicate that email verification is complete
        await pool.query(
            'UPDATE "sellersInfo" SET step = 2 WHERE id = $1',
            [sellerId]
        );

        return res.json({ message: "Email is verified", redirectTo: `/registration/phone?seedId=${seller.rows[0].id}&step=3` });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// seller phone number verification

router.post('/add-phone', async (req, res) => {
    const { sellerId, phoneNumber } = req.body;

    try {
        // Check if the seller exists
        const seller = await pool.query('SELECT * FROM "sellersInfo" WHERE id = $1', [sellerId]);
        if (seller.rows.length === 0) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        // Check if the phone number is already registered except the unverified phone number with that particular id
        const phoneExists = await pool.query(
            'SELECT * FROM "sellersInfo" WHERE "phoneNumber" = $1 AND step != 3',
            [phoneNumber]
        );
        if (phoneExists.rows.length > 0) {
            return res.status(400).json({ message: 'Phone number already registered' });
        }
        // Update the seller's phone number
        await pool.query(
            'UPDATE "sellersInfo" SET "phoneNumber" = $1 WHERE id = $2',
            [phoneNumber, sellerId]
        );

        // Send OTP to the phone number (you can use a service like Twilio for this)
        const otp = crypto.randomInt(100000, 999999).toString();
        const tokenExpires = new Date(Date.now() + 300000); // 5 minutes

        // Send OTP via Twilio SMS
        await client.messages.create({
            body: `Your verification code for Finkonomics is: ${otp}`,
            from: twilioPhoneNumber,
            to: phoneNumber
        });

        console.log({ location: "/verify-phone", otp })

        // Store the OTP in the database
        await pool.query(
            'UPDATE "sellersInfo" SET "verificationToken" = $1, "verificationTokenExpires" = $2, step = 3 WHERE id = $3',
            [otp, tokenExpires, sellerId]
        );
        return res.json({ message: "OTP sent to your phone number", redirectTo: `/registration/phone-otp/verification?seedId=${seller.rows[0].id}&phone=${phoneNumber}&step=4` });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/verify-phone', async (req, res) => {
    const { sellerId, otp } = req.body;

    try {

        const seller = await pool.query('SELECT * FROM "sellersInfo" WHERE id = $1', [sellerId]);

        // Check if the seller exists
        await verifyPhoneOtp(seller, sellerId, otp);

        // Update the step to indicate that phone verification is complete
        await pool.query(
            'UPDATE "sellersInfo" SET step = 4 WHERE id = $1',
            [sellerId]
        );

        // Generate a JWT token or set a cookie for the seller
        const token = jwt.sign({ id: seller.rows[0].id, entity: "seller" }, process.env.JWT_AUTH_SECRET, { expiresIn: '7d' });

        res.status(200).json({ message: 'Phone number verified successfully', token, redirectTo: "/registration/financial" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message || 'Server error' });
    }
});

// other details registration

router.post('/financial-info', authMiddleware, async (req, res) => {
    const { gstIn, streetAddress, pincode, city, country, cin } = req.body;

    try {
        // Get sellerId from authenticated user
        const sellerId = req.user.id;

        // Insert data into sellerFinancialInfo
        const insertQuery = `
      INSERT INTO "sellerFinancialInfo" ("sellerId", "gstIn", "streetAddress", "pincode", "city", "country", "cin")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

        const { rows } = await pool.query(insertQuery, [sellerId, gstIn, streetAddress, pincode, city, country, cin]);

        res.status(201).json({ message: 'Financial details added successfully', data: rows[0], redirectTo: "/registration/bank-details" }); // return the redirecting path

    } catch (error) {
        console.error('Error inserting financial info:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/bank-details', authMiddleware, async (req, res) => {
    const { bankAccountNumber, ifsc, accountHolderName, nameOfBank, accountType } = req.body;

    try {
        // Get sellerId from authenticated user
        const sellerId = req.user.id;

        // Insert data into sellerBankDetails
        const insertQuery = `
        INSERT INTO "sellerBankDetails" ("sellerId", "bankAccountNumber", "ifsc", "accountHolderName", "nameOfBank", "accountType")
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;

        const { rows } = await pool.query(insertQuery, [
            sellerId, bankAccountNumber, ifsc, accountHolderName, nameOfBank, accountType
        ]);

        res.status(201).json({ message: 'Bank details added successfully', data: rows[0], redirectTo: "/registration/other-details" }); // return the redirect url

    } catch (error) {
        console.error('Error inserting bank details:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/coins-details', authMiddleware, async (req, res) => {
    const { currentExchangeRatio, coinName, coinLogo } = req.body;

    try {
        // Get sellerId from authenticated user
        const sellerId = req.user.id;

        // Start a transaction
        await pool.query('BEGIN');

        // Update coinName and coinLogo in sellersInfo
        const updateSellersInfoQuery = `
        UPDATE "sellersInfo"
        SET "coinName" = $1, "coinLogo" = $2, "updatedAt" = NOW()
        WHERE id = $3
        RETURNING *;
      `;
        const updatedSeller = await pool.query(updateSellersInfoQuery, [coinName, coinLogo, sellerId]);

        // Update exchange ratio in sellerFinancialInfo
        const updateFinancialInfoQuery = `
        UPDATE "sellerFinancialInfo"
        SET "currentExchangeRatio" = $1, "updatedAt" = NOW()
        WHERE "sellerId" = $2
        RETURNING *;
      `;
        const updatedFinancialInfo = await pool.query(updateFinancialInfoQuery, [currentExchangeRatio, sellerId]);

        // Insert exchange ratio into coinExchangeRatio
        const insertCoinExchangeRatioQuery = `
        INSERT INTO "coinExchangeRatio" (id, "sellerId", "exchangeRatio")
        VALUES (gen_random_uuid(), $1, $2)
        RETURNING *;
      `;
        const insertedExchangeRatio = await pool.query(insertCoinExchangeRatioQuery, [sellerId, currentExchangeRatio]);

        // Commit transaction
        await pool.query('COMMIT');

        res.status(201).json({
            message: 'Coin details updated successfully',
            seller: updatedSeller.rows[0],
            financialInfo: updatedFinancialInfo.rows[0],
            coinExchangeRatio: insertedExchangeRatio.rows[0],
        });

    } catch (error) {
        // Rollback transaction on error
        await pool.query('ROLLBACK');
        console.error('Error updating coin details:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/other-details', authMiddleware, upload.single('logo'), async (req, res) => {
    try {
        const sellerId = req.user.id; // Extract seller ID from authMiddleware  
        const { natureOfBusiness, website } = req.body;
        let logoKey = null;

        // If a logo is uploaded, upload it to Cloudinary  
        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'seller_logos', format: 'png' },  // Store in a specific folder  
                    (error, uploadResult) => {
                        if (error) reject(error);
                        else resolve(uploadResult);
                    }
                );
                uploadStream.end(req.file.buffer);
            });

            logoKey = result.public_id; // Store only the key (public_id)
        }

        // Update seller details in the database  
        await pool.query(
            `UPDATE "sellersInfo" 
       SET "natureOfBusiness" = $1, 
           "website" = $2, 
           ${logoKey ? `"logo" = $3,` : ``} 
           "updatedAt" = CURRENT_TIMESTAMP
       WHERE id = $${logoKey ? 4 : 3}`,
            logoKey ? [natureOfBusiness, website, logoKey, sellerId] : [natureOfBusiness, website, sellerId]
        );

        res.json({ message: 'Details updated successfully', logoKey, redirectTo: "/logout" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/get-account-type', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "bankAccountType" ORDER BY id ASC');
        res.json({ success: true, list: result.rows });
    } catch (error) {
        console.error('Error fetching account types:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// router for resend the otp at email 
router.get("/resend-email-otp", async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Check if the email exists in the database
        const seller = await pool.query('SELECT * FROM "sellersInfo" WHERE email = $1', [email]);

        if (seller.rows.length === 0) {
            return res.status(404).json({ message: "Email not found" });
        }

        // Generate a new OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const tokenExpires = new Date(Date.now() + 300000); // 5 minutes

        console.log({ location: "/resend-email-otp", otp });

        // Send OTP via email
        const subject = "Resend OTP - Verify Your Email";
        const text = `Hello, here is your new OTP.`;
        const html = `<p>Hello, your new OTP is <strong>${otp}</strong></p>`;

        await sendMail(email, subject, text, html);

        // Update the OTP in the database
        await pool.query(
            'UPDATE "sellersInfo" SET "verificationToken" = $1, "verificationTokenExpires" = $2 WHERE email = $3',
            [otp, tokenExpires, email]
        );

        res.json({ message: "New OTP has been sent to your registered email" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/resend-phone-otp', async (req, res) => {
    try {
        const { phoneNumber } = req.query;

        if (!phoneNumber) {
            return res.status(400).json({ message: 'Phone number is required' });
        }

        // Check if the phone number exists in the database
        const user = await pool.query('SELECT * FROM "sellersInfo" WHERE "phoneNumber" = $1', [phoneNumber]);

        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'Phone number not found' });
        }

        // Generate a new OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const tokenExpires = new Date(Date.now() + 300000); // 5 minutes

        console.log({ location: '/resend-phone-otp', otp });

        // Send OTP via Twilio SMS
        await client.messages.create({
            body: `Your new verification code is: ${otp}`,
            from: twilioPhoneNumber,
            to: phoneNumber
        });

        // Update the OTP in the database
        await pool.query(
            'UPDATE "sellersInfo" SET "verificationToken" = $1, "verificationTokenExpires" = $2 WHERE "phoneNumber" = $3',
            [otp, tokenExpires, phoneNumber]
        );

        res.json({ message: 'New OTP has been sent to your registered phone number' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// company login

router.post('/login', async (req, res) => {
    const { email, password, phoneNumber } = req.body;

    try {

        if (phoneNumber != undefined) {
            const phoneExists = await pool.query(
                'SELECT * FROM "sellersInfo" WHERE "phoneNumber" = $1',
                [phoneNumber]
            );
            if (phoneExists.rows.length == 0) {
                return res.status(400).json({ message: "Phone number doesn't exits" });
            } else {
                const sellerId = phoneExists.rows[0].id
                // Send OTP to the phone number (you can use a service like Twilio for this)
                const otp = crypto.randomInt(100000, 999999).toString();
                const tokenExpires = new Date(Date.now() + 300000); // 5 minutes

                console.log({ location: "/login", phoneOtp: otp })

                // Store the OTP in the database
                await pool.query(
                    'UPDATE "sellersInfo" SET "verificationToken" = $1, "verificationTokenExpires" = $2 WHERE id = $3',
                    [otp, tokenExpires, sellerId]
                );

                return res.status(200).json({ message: 'OTP sent to your phone number', redirectTo: `/login/phone-otp/verification?seedid=${sellerId}` });
            }
        }

        // Check if user exists
        const seller = await pool.query('SELECT * FROM "sellersInfo" WHERE email = $1', [email]);
        if (seller.rows.length === 0) {
            return res.status(400).json({ message: 'Email not found. Please register' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, seller.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // on the basis of the step only i have to do redirection

        if (seller.rows[0].step == 1) {
            // generate a otp
            const otp = crypto.randomInt(100000, 999999).toString();
            const tokenExpires = new Date(Date.now() + 300000);

            // send the otp to mail

            console.log({ location: "/login", emailOtp: otp })

            // save the otp and expiry to database

            await pool.query(
                'UPDATE "sellersInfo" SET "verificationToken" = $1, "verificationTokenExpires" = $2 WHERE "email" = $3',
                [otp, tokenExpires, email]
            );

            return res.json({ message: "Otp is sent to you register email. Please verify", redirectTo: `/register/email-otp/verification?seedId=${seller.rows[0].id}` })

        } else if (seller.rows[0].step == 2 || seller.rows[0].step == 3) {
            return res.json({ message: "Please verify the phone number", redirectTo: `/register/phone/verification?seedId=${seller.rows[0].id}` })
        }

        // Generate JWT
        const token = jwt.sign({ id: seller.rows[0].id }, process.env.JWT_AUTH_SECRET, { expiresIn: '7d' });

        // res.cookie('token', token, {
        //   httpOnly: true,
        //   secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        //   maxAge: 7 * 24 * 60 * 60 * 1000,
        // });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// company details update



// company transaction


// sellers-people analytics

router.get('/user-portfolio-application', authMiddleware, async (req, res) => {
    try {
        // Get sellerId from authenticated user
        const sellerId = req.user.id;

        // Query to fetch all users linked to this sellerId in userPortfolio
        const query = `
        SELECT up.id, up."userId", up."addedAt", up.verified, 
               u.username, u.email, u."phoneNumber"
        FROM "userPortfolio" up
        JOIN "users" u ON up."userId" = u.id
        WHERE up."sellerId" = $1
        ORDER BY up."addedAt" DESC;
      `;

        const result = await pool.query(query, [sellerId]);

        res.status(200).json({
            message: 'User portfolio fetched successfully',
            users: result.rows
        });

    } catch (error) {
        console.error('Error fetching user portfolio:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



async function verifyPhoneOtp(seller, sellerId, otp) {

    if (seller.rows.length === 0) {
        throw new Error('Seller not found');
    }

    // Check if the OTP matches and is not expired
    if (seller.rows[0].verificationToken !== otp) {
        throw new Error('Invalid OTP');
    } else if (new Date(seller.rows[0].verificationTokenExpires) < new Date()) {
        throw new Error('Otp expired');
    }


    // Clear OTP fields after successful verification
    await pool.query(
        'UPDATE "sellersInfo" SET "verificationToken" = NULL, "verificationTokenExpires" = NULL WHERE id = $1',
        [sellerId]
    );
}

module.exports = router;