-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'WARGA',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Surat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "jenisSurat" TEXT NOT NULL,
    "noTiket" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Belum Dikerjakan',
    "catatanAdmin" TEXT,
    "waktuSelesai" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Surat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_nik_key" ON "User"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "Surat_noTiket_key" ON "Surat"("noTiket");

-- CreateIndex
CREATE INDEX "Surat_userId_createdAt_idx" ON "Surat"("userId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "Surat_userId_status_idx" ON "Surat"("userId", "status");

-- CreateIndex
CREATE INDEX "Surat_noTiket_idx" ON "Surat"("noTiket");
