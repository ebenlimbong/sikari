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
    CONSTRAINT "Surat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Surat_noTiket_key" ON "Surat"("noTiket");
