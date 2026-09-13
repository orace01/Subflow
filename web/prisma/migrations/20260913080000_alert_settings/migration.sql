-- AlterTable
ALTER TABLE "User"
  ADD COLUMN     "alertBeforeCharge" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN     "alertPriceHike" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN     "alertWeeklyDigest" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN     "alertDelayDays" INTEGER NOT NULL DEFAULT 3;
