-- CreateTable
CREATE TABLE "Document" (
    "document_id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "author_name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL,
    "expirate_date" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("document_id")
);

-- CreateTable
CREATE TABLE "Signature" (
    "signature_id" SERIAL NOT NULL,
    "document_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "user_name" TEXT NOT NULL,

    CONSTRAINT "Signature_pkey" PRIMARY KEY ("signature_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Signature_document_id_user_id_key" ON "Signature"("document_id", "user_id");

-- AddForeignKey
ALTER TABLE "Signature" ADD CONSTRAINT "Signature_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "Document"("document_id") ON DELETE RESTRICT ON UPDATE CASCADE;
