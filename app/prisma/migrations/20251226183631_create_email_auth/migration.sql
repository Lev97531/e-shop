-- CreateTable
CREATE TABLE "EmailAuth" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "passwordHash" TEXT NOT NULL,
    "passwordSalt" TEXT NOT NULL,
    CONSTRAINT "EmailAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
