-- CreateTable
CREATE TABLE "Training" (
    "id" TEXT NOT NULL,
    "trainingKind" VARCHAR(100) NOT NULL,
    "exercise" TEXT NOT NULL,
    "serieQuantity" INTEGER NOT NULL,
    "repetitionQuantity" INTEGER NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
