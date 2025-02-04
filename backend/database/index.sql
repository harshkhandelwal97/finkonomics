
CREATE TABLE "users" (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    fullname VARCHAR(52),
    password VARCHAR(150) NOT NULL,
    "phoneNumber" VARCHAR(14) UNIQUE,
    "aadhaarNumber" VARCHAR(16) UNIQUE,
    email VARCHAR(40) NOT NULL UNIQUE,
    "dateOfBirth" DATE,
    "verificationToken" VARCHAR(255),
    "verificationTokenExpires" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN DEFAULT FALSE
    step smallint 
);

CREATE TABLE "sellersInfo" (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    "legalName" VARCHAR(100),
    logo VARCHAR(80),
    "coinName" VARCHAR(20),
    "coinLogo" VARCHAR(80),
    username VARCHAR(52) UNIQUE,
    "phoneNumber" VARCHAR(14) UNIQUE,
    email VARCHAR(40) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    "natureOfBusiness" VARCHAR(100),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN DEFAULT FALSE,
    "verificationToken" VARCHAR(255),
    "verificationTokenExpires" TIMESTAMP,
    step smallint
    website VARCHAR(100)
);

CREATE TABLE "sellerFinancialInfo" (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    "sellerId" UUID NOT NULL,
    "gstIn" VARCHAR(15) UNIQUE,
    "currentExchangeRatio" DECIMAL(8,4),
    "streetAddress" VARCHAR(50),
    pincode INT,
    city VARCHAR(30),
    state VARCHAR(20),
    country VARCHAR(50), 
    cin VARCHAR(21) UNIQUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_sellerId" FOREIGN KEY ("sellerId") REFERENCES "sellersInfo"(id) ON DELETE CASCADE
);

CREATE TABLE "bankAccountType" (
    id SERIAL PRIMARY KEY,
    "accountType" VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE "sellerBankDetails" (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    "sellerId" UUID NOT NULL,
    "bankAccountNumber" VARCHAR(25) UNIQUE,
    ifsc VARCHAR(15),
    "accountHolderName" VARCHAR(40),
    "nameOfBank" VARCHAR(50),
    "accountType" INT NOT NULL,
    "managedBy" VARCHAR(50),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_sellerId" FOREIGN KEY ("sellerId") REFERENCES "sellersInfo"(id) ON DELETE CASCADE,
    CONSTRAINT "fk_accountType" FOREIGN KEY ("accountType") REFERENCES "bankAccountType"(id)
);

CREATE TABLE "userPortfolio" (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    "sellerId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "addedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "coinsAvailable" int,
    verified BOOLEAN DEFAULT FALSE,
    CONSTRAINT "fk_sellerId" FOREIGN KEY ("sellerId") REFERENCES "sellersInfo"(id) ON DELETE CASCADE,
    CONSTRAINT "fk_userId" FOREIGN KEY ("userId") REFERENCES "users"(id) ON DELETE CASCADE
);


CREATE TABLE "coinExchangeRatio" (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    "sellerId" UUID NOT NULL,
    "exchangeRatio" DECIMAL(8,4) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT "fk_sellerId" FOREIGN KEY ("sellerId") REFERENCES "sellersInfo"(id) ON DELETE CASCADE
);

CREATE TABLE "transactionsInfo" (
    "transactionId" VARCHAR(100) NOT NULL PRIMARY KEY,
    "userId" UUID NOT NULL,
    "sellerTransferredToId" UUID NOT NULL,
    "timeOfPayment" TIMESTAMP NOT NULL DEFAULT NOW(),
    "totalAmount" INT NOT NULL,
    CONSTRAINT "fk_userId" FOREIGN KEY ("userId") REFERENCES "users"(id) ON DELETE CASCADE,
    CONSTRAINT "fk_seller" FOREIGN KEY ("sellerTransferredToId") REFERENCES "sellersInfo"(id) ON DELETE CASCADE
);

CREATE TABLE "toSellerSettlement" (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    amount BIGINT NOT NULL,
    "transactionId" VARCHAR(100) NOT NULL,
    CONSTRAINT "fk_transactionId" FOREIGN KEY ("transactionId") REFERENCES "transactionsInfo"("transactionId") ON DELETE CASCADE
);

CREATE TABLE "bankPayment" (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    amount BIGINT NOT NULL,
    "transactionId" VARCHAR(100) NOT NULL,
    "bankTransactionId" BIGINT NOT NULL UNIQUE,
    "settlementTime" TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT "fk_transactionId" FOREIGN KEY ("transactionId") REFERENCES "transactionsInfo"("transactionId") ON DELETE CASCADE
);

CREATE TABLE "fromSellerSettlement" (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    "transactionId" VARCHAR(100) NOT NULL,
    amount INT NOT NULL,
    points DECIMAL(18,2) NOT NULL,
    "sellerId" UUID NOT NULL,
    CONSTRAINT "fk_transactionId" FOREIGN KEY ("transactionId") REFERENCES "transactionsInfo"("transactionId") ON DELETE CASCADE,
    CONSTRAINT "fk_seller" FOREIGN KEY ("sellerId") REFERENCES "sellersInfo"(id) ON DELETE CASCADE
);

CREATE TABLE "toSellerSettlementHistory" (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    amount BIGINT NOT NULL,
    "transactionId" VARCHAR(100) NOT NULL,
    "sellerId" UUID NOT NULL,
    "settlementTime" TIMESTAMP NOT NULL DEFAULT NOW(),
    "bankTransactionId" BIGINT NOT NULL UNIQUE,
    CONSTRAINT "fk_transactionId" FOREIGN KEY ("transactionId") REFERENCES "transactionsInfo"("transactionId") ON DELETE CASCADE,
    CONSTRAINT "fk_seller" FOREIGN KEY ("sellerId") REFERENCES "sellersInfo"(id) ON DELETE CASCADE
);

CREATE TABLE "fromSellerSettlementHistory" (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    amount BIGINT NOT NULL,
    "transactionId" VARCHAR(100) NOT NULL,
    "sellerId" UUID NOT NULL,
    "settlementTime" TIMESTAMP NOT NULL DEFAULT NOW(),
    "bankTransactionId" BIGINT NOT NULL UNIQUE,
    incentive BIGINT DEFAULT 0,
    CONSTRAINT "fk_transactionId" FOREIGN KEY ("transactionId") REFERENCES "transactionsInfo"("transactionId") ON DELETE CASCADE,
    CONSTRAINT "fk_seller" FOREIGN KEY ("sellerId") REFERENCES "sellersInfo"(id) ON DELETE CASCADE
);



-- Indexing for performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_phoneNumber ON users(phoneNumber);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_sellers_username ON sellersInfo(username);
CREATE INDEX idx_sellers_phoneNumber ON sellersInfo(phoneNumber);
CREATE INDEX idx_sellers_email ON sellersInfo(email);
CREATE INDEX idx_transactions_userId ON transactionsInfo(userId);
CREATE INDEX idx_transactions_seller ON transactionsInfo(sellerTransferredToId);
