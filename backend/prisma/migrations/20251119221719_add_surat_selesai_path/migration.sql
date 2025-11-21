/*
  Warnings:

  - You are about to drop the column `suratSelesaiPath` on the `Surat` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Surat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "jenisSurat" TEXT NOT NULL,
    "noTiket" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Belum Dikerjakan',
    "catatanAdmin" TEXT,
    "waktuSelesai" DATETIME,
    "fileSuratSelesai" TEXT,
    "uploadedAt" DATETIME,
    "uploadedBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Surat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Surat" ("catatanAdmin", "createdAt", "data", "id", "jenisSurat", "noTiket", "status", "updatedAt", "uploadedAt", "uploadedBy", "userId", "waktuSelesai") SELECT "catatanAdmin", "createdAt", "data", "id", "jenisSurat", "noTiket", "status", "updatedAt", "uploadedAt", "uploadedBy", "userId", "waktuSelesai" FROM "Surat";
DROP TABLE "Surat";
ALTER TABLE "new_Surat" RENAME TO "Surat";
CREATE UNIQUE INDEX "Surat_noTiket_key" ON "Surat"("noTiket");
CREATE INDEX "Surat_userId_createdAt_idx" ON "Surat"("userId", "createdAt" DESC);
CREATE INDEX "Surat_userId_status_idx" ON "Surat"("userId", "status");
CREATE INDEX "Surat_noTiket_idx" ON "Surat"("noTiket");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
