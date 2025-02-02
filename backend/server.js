require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { route } = require("./route/users");

const app = express();
app.use(express.json());

const corsOptions = {
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));


const userRoute = require("./route/users")
app.use("/api/user", userRoute)

const sellerRoute = require("./route/sellers")
app.use("/api/seller", sellerRoute)

const start_server = async () => {
    app.listen(process.env.SERVER_PORT, async () => {
        console.log(`Server started on port ${process.env.SERVER_PORT}`);
    });
};

start_server();
