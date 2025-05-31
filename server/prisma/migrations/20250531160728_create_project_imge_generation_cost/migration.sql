-- CreateTable
CREATE TABLE "ImageGenerationResponse" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "outputFormat" TEXT NOT NULL,
    "quality" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "inputTokens" INTEGER NOT NULL,
    "imageTokens" INTEGER NOT NULL,
    "textTokens" INTEGER NOT NULL,
    "outputTokens" INTEGER NOT NULL,
    "totalTokens" INTEGER NOT NULL,
    "imageCost" DOUBLE PRECISION NOT NULL,
    "tokenCost" DOUBLE PRECISION NOT NULL,
    "totalCost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ImageGenerationResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ImageGenerationResponse_projectId_key" ON "ImageGenerationResponse"("projectId");

-- AddForeignKey
ALTER TABLE "ImageGenerationResponse" ADD CONSTRAINT "ImageGenerationResponse_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
