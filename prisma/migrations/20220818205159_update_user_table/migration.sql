-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "newUser" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "displayName" DROP NOT NULL;
