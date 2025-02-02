require("dotenv").config();

const router = require("express").Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const twilio = require('twilio'); 

const authMiddleware = require("../middleware/auth");
const pool = require("../database/connection");
const sendMail = require("../utils/nodemailer");

// User registration

router.post('/register', async (req, res) => {
  const { fullname, email, password } = req.body
  try {
    // Check if user already exists
    const userExists = await pool.query('SELECT * FROM "users" WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user into the database
    const newUser = await pool.query(
      'INSERT INTO users (fullname, email, password, step) VALUES ($1, $2, $3, 1) RETURNING *',
      [fullname, email, hashedPassword]
    );

    // generate the otp 

    const otp = crypto.randomInt(100000, 999999).toString();
    const tokenExpires = new Date(Date.now() + 300000); // 5 minutes

    // send the otp to the register email

    const subject = 'Verify Your Email';
    const text = `Hello ${fullname}, Please verify your email.`;
    const html = `<p>Hello <strong>${fullname}</strong>, this is otp - ${otp}</p>`;

    await sendMail(email, subject, text, html);

    // insert the otp in the databse 

    await pool.query(
      'UPDATE "users" SET "verificationToken" = $1, "verificationTokenExpires" = $2 WHERE email = $3',
      [otp, tokenExpires, email]
    );

    res.json({ message: "Please verify the otp send to you register email", redirectTo: `/register/email-otp/verification?seedId=${newUser.rows[0].id}&step=1` });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// verify the opt send to the users email

router.post('/verify-email', async (req, res) => {
  const { userId, otp } = req.body;

  try {
    // Check if the user exists
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the OTP matches and is not expired
    if (user.rows[0].verificationToken !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    } else if (new Date(user.rows[0].verificationTokenExpires) < new Date()) {
      return res.status(400).json({ message: 'Otp expired' });
    }

    // update the verification details
    await pool.query(
      'UPDATE users SET "verificationToken" = NULL, "verificationTokenExpires" = NULL WHERE id = $1',
      [userId]
    );

    // Update the step to indicate that email verification is complete
    await pool.query(
      'UPDATE users SET step = 2 WHERE id = $1',
      [userId]
    );

    return res.json({ message: "Email is verified", redirectTo: `/register/phone/verification?seedId=${user.rows[0].id}&step=2` });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// user phone number verification

router.post('/add-phone', async (req, res) => {
  const { userId, phoneNumber } = req.body;

  try {
    // Check if the user exists
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the phone number is already registered except the unverified phone number with that particular id
    const phoneExists = await pool.query(
      'SELECT * FROM users WHERE "phoneNumber" = $1 AND step != 3',
      [phoneNumber]
    );
    if (phoneExists.rows.length > 0) {
      return res.status(400).json({ message: 'Phone number already registered' });
    }
    // Update the user's phone number
    await pool.query(
      'UPDATE users SET "phoneNumber" = $1 WHERE id = $2',
      [phoneNumber, userId]
    );

    // Send OTP to the phone number (you can use a service like Twilio for this)
    const otp = crypto.randomInt(100000, 999999).toString();
    const tokenExpires = new Date(Date.now() + 300000); // 5 minutes

    console.log({ location: "/verify-phone", otp })

    // Store the OTP in the database
    await pool.query(
      'UPDATE users SET "verificationToken" = $1, "verificationTokenExpires" = $2, step = 3 WHERE id = $3',
      [otp, tokenExpires, userId]
    );
    return res.json({ message: "OTP sent to your phone number", redirectTo: `/register/phone-otp/verification?seedId=${user.rows[0].id}&step=3` });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/verify-phone', async (req, res) => {
  const { userId, otp } = req.body;

  try {

    const user = await pool.query('SELECT * FROM "users" WHERE id = $1', [userId]);

    // Check if the user exists
    await verifyPhoneOtp(user, userId, otp);

    // Update the step to indicate that phone verification is complete
    await pool.query(
      'UPDATE "users" SET step = 4 WHERE id = $1',
      [userId]
    );

    // Generate a JWT token or set a cookie for the user
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_AUTH_SECRET, { expiresIn: '7d' });

    res.status(200).json({ message: 'Phone number verified successfully', token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message || 'Server error' });
  }
});

// User login

router.post('/login', async (req, res) => {
  const { email, password, phoneNumber } = req.body;

  try {

    if (phoneNumber != undefined) {
      const phoneExists = await pool.query(
        'SELECT * FROM "users" WHERE "phoneNumber" = $1',
        [phoneNumber]
      );
      if (phoneExists.rows.length == 0) {
        return res.status(400).json({ message: "Phone number doesn't exits" });
      } else {
        const userId = phoneExists.rows[0].id
        // Send OTP to the phone number (you can use a service like Twilio for this)
        const otp = crypto.randomInt(100000, 999999).toString();
        const tokenExpires = new Date(Date.now() + 300000); // 5 minutes

        console.log({location: "/login", phoneOtp: otp})

        // Store the OTP in the database
        await pool.query(
          'UPDATE "users" SET "verificationToken" = $1, "verificationTokenExpires" = $2 WHERE id = $3',
          [otp, tokenExpires, userId]
        );

        return res.status(200).json({ message: 'OTP sent to your phone number', redirectTo: `/login/phone-otp/verification?seedid=${userId}` });
      }
    }

    // Check if user exists
    const user = await pool.query('SELECT * FROM "users" WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Email not found. Please register' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // on the basis of the step only i have to do redirection

    if (user.rows[0].step == 1) {
      // generate a otp
      const otp = crypto.randomInt(100000, 999999).toString();
      const tokenExpires = new Date(Date.now() + 300000);

      // send the otp to mail

      console.log({ location: "/login",emailOtp: otp })

      // save the otp and expiry to database

      await pool.query(
        'UPDATE "users" SET "verificationToken" = $1, "verificationTokenExpires" = $2 WHERE "email" = $3',
        [otp, tokenExpires, email]
      );

      return res.json({ message: "Otp is sent to you register email. Please verify", redirectTo: `/register/email-otp/verification?seedId=${user.rows[0].id}` })

    } else if (user.rows[0].step == 2 || user.rows[0].step == 3) {
      return res.json({ message: "Please verify the phone number", redirectTo: `/register/phone/verification?seedId=${user.rows[0].id}` })
    }

    // Generate JWT
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_AUTH_SECRET, { expiresIn: '7d' });

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

// login otp verification for phone number

router.post('/verify-login-otp', async (req, res) => {
  const { userId, otp } = req.body;
  try {

    const user = await pool.query('SELECT * FROM "users" WHERE id = $1', [userId]);

    await verifyPhoneOtp(user, userId, otp)

    if (user.rows[0].step == 3) {
      await pool.query(
        'UPDATE users SET step = 4 WHERE id = $4',
        [id]
      );
    }


    // Generate JWT
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_AUTH_SECRET, { expiresIn: '7d' });

    // res.cookie('token', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });

    return res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ message: err.message || 'Server error' });
  }
})

// Forgot Password Route email based

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Set token expiration
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour

    // Save the token and expiration in the database
    await pool.query(
      'UPDATE users SET "resetPasswordToken" = $1, "resetPasswordExpires" = $2 WHERE id = $3',
      [resetToken, resetTokenExpires, user.rows[0].id]
    );

    // Send the reset link to the user's email
    const resetLink = `http://${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'youremail@gmail.com',
    //     pass: 'yourpassword',
    //   },
    // });

    // const mailOptions = {
    //   from: 'youremail@gmail.com',
    //   to: email,
    //   subject: 'Password Reset',
    //   text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
    //          Please click on the following link, or paste it into your browser to complete the process:\n\n
    //          ${resetLink}\n\n
    //          If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    // };

    // transporter.sendMail(mailOptions, (err, info) => {
    //   if (err) {
    //     console.error(err.message);
    //     return res.status(500).json({ message: 'Failed to send email' });
    //   }

    //   res.status(200).json({ message: 'Password reset link sent to your email' });
    // });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset Password Route email base
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;

  try {
    // Find the user with the matching token and check if it's not expired
    const user = await pool.query(
      'SELECT * FROM users WHERE "resetPasswordToken" = $1 AND "resetPasswordExpires" > $2',
      [token, new Date()]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user's password and clear the reset token
    await pool.query(
      'UPDATE users SET password = $1, "resetPasswordToken" = NULL, "resetPasswordExpires" = NULL WHERE id = $2',
      [hashedPassword, user.rows[0].id]
    );

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


// Initialize Twilio client
// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Send Token/OTP Route
router.post('/send-token', async (req, res) => {
  const { email, phoneNumber } = req.body;

  try {
    // Check if the user exists
    let user;
    if (email) {
      user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    } else if (phoneNumber) {
      user = await pool.query('SELECT * FROM users WHERE "phoneNumber" = $1', [phoneNumber]);
    } else {
      return res.status(400).json({ message: 'Email or phone number is required' });
    }

    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a token or OTP
    const token = crypto.randomBytes(20).toString('hex'); // For email
    const otp = crypto.randomInt(100000, 999999).toString(); // For phone

    // Set token/OTP expiration (e.g., 5 minutes from now)
    const tokenExpires = new Date(Date.now() + 300000); // 5 minutes

    // Save the token/OTP and expiration in the database
    await pool.query(
      'UPDATE users SET "verificationToken" = $1, "verificationTokenExpires" = $2 WHERE id = $3',
      [email ? token : otp, tokenExpires, user.rows[0].id]
    );

    // Send the token/OTP via email or SMS
    if (email) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verification Token',
        text: `Your verification token is: ${token}`,
      };

      await transporter.sendMail(mailOptions);
    } else if (phoneNumber) {
      await client.messages.create({
        body: `Your OTP for verification is: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      });
    }

    res.status(200).json({ message: 'Token/OTP sent successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/verify-token', async (req, res) => {
  const { email, phoneNumber, token, otp } = req.body;

  try {
    // Find the user with the matching email/phone and token/OTP
    let user;
    if (email) {
      user = await pool.query(
        'SELECT * FROM users WHERE email = $1 AND "verificationToken" = $2 AND "verificationTokenExpires" > $3',
        [email, token, new Date()]
      );
    } else if (phoneNumber) {
      user = await pool.query(
        'SELECT * FROM users WHERE "phoneNumber" = $1 AND "verificationToken" = $2 AND "verificationTokenExpires" > $3',
        [phoneNumber, otp, new Date()]
      );
    } else {
      return res.status(400).json({ message: 'Email or phone number is required' });
    }

    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token/OTP' });
    }

    // Mark the user as verified (optional, if you have a `verified` field)
    await pool.query('UPDATE users SET "verified" = TRUE WHERE id = $1', [user.rows[0].id]);

    // Clear the token/OTP fields
    await pool.query(
      'UPDATE users SET "verificationToken" = NULL, "verificationTokenExpires" = NULL WHERE id = $1',
      [user.rows[0].id]
    );

    res.status(200).json({ message: 'Verification successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update password
router.put('/update-password', authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id; // Authenticated user's ID from the middleware

  try {
    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    // Fetch the user's current password from the database
    const user = await pool.query('SELECT password FROM users WHERE id = $1', [userId]);
    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the current password with the stored password
    const isMatch = await bcrypt.compare(currentPassword, user.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password in the database
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// user profile update

router.put('/update-profile', authMiddleware, async (req, res) => {
  const { username, email, phoneNumber } = req.body;
  const userId = req.user.id; // Authenticated user's ID from the middleware

  try {
    // Validate input
    if (!username && !email && !phoneNumber) {
      return res.status(400).json({ message: 'At least one field is required to update' });
    }

    // Build the update query dynamically based on provided fields
    let query = 'UPDATE users SET ';
    const params = [];
    let paramIndex = 1;

    if (username) {
      query += `username = $${paramIndex}, `;
      params.push(username);
      paramIndex++;
    }

    if (email) {
      query += `email = $${paramIndex}, `;
      params.push(email);
      paramIndex++;
    }

    if (phoneNumber) {
      query += `"phoneNumber" = $${paramIndex}, `;
      params.push(phoneNumber);
      paramIndex++;
    }

    // Remove the trailing comma and space
    query = query.slice(0, -2);

    // Add the WHERE clause
    query += ` WHERE id = $${paramIndex} RETURNING *`;
    params.push(userId);

    // Execute the update query
    const updatedUser = await pool.query(query, params);

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser.rows[0],
    });
  } catch (err) {
    console.error(err.message);

    // Handle unique constraint errors (e.g., duplicate email or phone number)
    if (err.code === '23505') {
      return res.status(400).json({ message: 'Email or phone number already exists' });
    }

    res.status(500).json({ message: 'Server error' });
  }
});

// User can see all the register company on finkonomics

router.get('/get-all-sellers', authMiddleware, async (req, res) => {
  try {
    // Extract query parameters
    const { search, natureOfBusiness, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // Base query
    let query = `
        SELECT 
          id, 
          name, 
          logo, 
          coinName, 
          coinLogo,
          natureOfBusiness
        FROM "sellersInfo" 
        WHERE isDeleted = FALSE
      `;

    const params = [];

    // Add search functionality (by name)
    if (search) {
      query += ` AND name ILIKE $${params.length + 1}`;
      params.push(`%${search}%`);
    }

    // Add filter functionality (by nature of business)
    if (natureOfBusiness) {
      query += ` AND natureOfBusiness = $${params.length + 1}`;
      params.push(natureOfBusiness);
    }

    // Add pagination
    query += `
        ORDER BY createdAt DESC
        LIMIT $${params.length + 1} OFFSET $${params.length + 2}
      `;
    params.push(limit, offset);

    // Execute the query
    const sellers = await pool.query(query, params);

    // Get the total count of sellers (for infinite scrolling)
    let countQuery = `SELECT COUNT(*) FROM "sellersInfo" WHERE isDeleted = FALSE`;
    const countParams = [];

    if (search) {
      countQuery += ` AND name ILIKE $${countParams.length + 1}`;
      countParams.push(`%${search}%`);
    }

    if (natureOfBusiness) {
      countQuery += ` AND natureOfBusiness = $${countParams.length + 1}`;
      countParams.push(natureOfBusiness);
    }

    const totalCount = await pool.query(countQuery, countParams);

    // Return the response
    res.status(200).json({
      message: 'Sellers fetched successfully',
      sellers: sellers.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(totalCount.rows[0].count),
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add Companies to User's Portfolio

router.post('/add-companies', authMiddleware, async (req, res) => {
  const { companyIds } = req.body; // Array of sellerIds from the frontend
  const userId = req.user.id; // Authenticated user's ID from the middleware

  try {
    if (!companyIds || !Array.isArray(companyIds) || companyIds.length === 0) {
      return res.status(400).json({ message: 'Invalid or empty company IDs' });
    }

    // Insert each company into the user's portfolio
    for (const sellerId of companyIds) {
      await pool.query(
        'INSERT INTO "userPortfolio" (sellerId, userId) VALUES ($1, $2)',
        [sellerId, userId]
      );
    }

    res.status(201).json({ message: 'Companies added to portfolio successfully' });
  } catch (err) {
    console.error(err.message);

    // Handle foreign key constraint errors (invalid sellerId or userId)
    if (err.code === '23503') {
      return res.status(400).json({ message: 'Invalid sellerId or userId' });
    }

    res.status(500).json({ message: 'Server error' });
  }
});

// Update User's Portfolio

router.put('/update-companies', authMiddleware, async (req, res) => {
  const { companyIds } = req.body; // Array of new sellerIds
  const userId = req.user.id; // Authenticated user's ID

  try {
    if (!companyIds || !Array.isArray(companyIds)) {
      return res.status(400).json({ message: 'Invalid company IDs' });
    }

    // Fetch the user's current portfolio
    const currentPortfolio = await pool.query(
      'SELECT sellerId FROM "userPortfolio" WHERE userId = $1',
      [userId]
    );

    // Extract current sellerIds
    const currentSellerIds = currentPortfolio.rows.map((row) => row.sellerid);

    // Identify added and removed sellerIds
    const addedSellerIds = companyIds.filter((id) => !currentSellerIds.includes(id));
    const removedSellerIds = currentSellerIds.filter((id) => !companyIds.includes(id));

    // Insert added sellerIds
    for (const sellerId of addedSellerIds) {
      await pool.query(
        'INSERT INTO "userSellersVisits" (sellerId, userId) VALUES ($1, $2)',
        [sellerId, userId]
      );
    }

    // Delete removed sellerIds
    for (const sellerId of removedSellerIds) {
      await pool.query(
        'DELETE FROM "userSellersVisits" WHERE sellerId = $1 AND userId = $2',
        [sellerId, userId]
      );
    }

    res.status(200).json({
      message: 'Portfolio updated successfully',
      added: addedSellerIds,
      removed: removedSellerIds,
    });
  } catch (err) {
    console.error(err.message);

    // Handle foreign key constraint errors
    if (err.code === '23503') {
      return res.status(400).json({ message: 'Invalid sellerId or userId' });
    }

    res.status(500).json({ message: 'Server error' });
  }
});

router.get("/testing", async (req, res) => {
  try {
    const userExists = await pool.query('SELECT * FROM users WHERE aadhaarNumber = $1', ['98765483922']);
    return res.json({ data: userExists.rows }).status(200)
  } catch (error) {
    console.log(error)
  }
})


async function verifyPhoneOtp(user, id, otp) {

  if (user.rows.length === 0) {
    throw new Error('User not found');
  }

  // Check if the OTP matches and is not expired
  if (user.rows[0].verificationToken !== otp) {
    throw new Error('Invalid OTP');
  } else if (new Date(user.rows[0].verificationTokenExpires) < new Date()) {
    throw new Error('Otp expired');
  }


  // Clear OTP fields after successful verification
  await pool.query(
    'UPDATE users SET "verificationToken" = NULL, "verificationTokenExpires" = NULL WHERE id = $1',
    [id]
  );
}


async function sendOtpToPhone(phoneNumber) {

}

async function sendOtpToEmail(phoneNumber) {

}


module.exports = router;