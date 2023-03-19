import { Injectable, NotFoundException } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { PrismaService } from "src/prisma/prisma.service";
import { WriteDocDto } from "./dto/write_doc.dto";
import { DetailDocData, ListDocData } from "./entities/doc.entity"; // maybe delete later

@Injectable()
export class DocService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async getDocList() {
    //get data from db and make array of listDocData
    const documents = await this.prisma.document.findMany({
      select: {
        document_id: true,
        title: true,
        thumbnail: true,
        signatures: {
          select: {
            signature_id: true,
          },
        },
      },
    });

    return documents.map((document) => {
      return {
        document_id: document.document_id,
        title: document.title,
        thumbnail: document.thumbnail,
        signature_count: document.signatures.length,
      };
    });
  }

  async writeDoc(writeData: WriteDocDto, authHeader: string) {
    const currentDate = new Date();
    const expireDate = new Date();
    expireDate.setDate(currentDate.getDate() + 30);

    const token = this.authService.verifyJWT(authHeader.split(' ')[1]);

    await this.prisma.document.create({
      data: {
        author_id: token.uid,
        author_name: token.username,
        title: writeData.title,
        create_date: currentDate,
        expirate_date: expireDate,
        content: writeData.description,
        thumbnail: writeData.thumbnail,
      },
    });
  }

  async getDoc(documentId: number, authHeader: string) {
    const document = await this.prisma.document.findUnique({
      where: { document_id: documentId },
      include: { signatures: true },
    });
    const token = this.authService.verifyJWT(authHeader.split(' ')[1]);
    const signed = await this.prisma.signature.findUnique({
      where: {
        document_id_user_id: {
          document_id: documentId,
          user_id: token.uid,
        },
      },
    });

    const response = {
      document_id: document.document_id,
      title: document.title,
      thumbnail: document.thumbnail,
      signature_count: document.signatures.length,
      description: document.content,
      author_id: document.author_id,
      is_auther: document.author_id === token.uid, 
      signed: !!signed,
    };

    return response;
  }

  async putSign(documentId: number, authHeader: string) {
    // assume documentId and signatureData are already defined
    const document = await this.prisma.document.findUnique({ where: { document_id: documentId }, include: { signatures: true } });
    if (!document) {
      throw new NotFoundException(`Document with ID ${documentId} not found`);
    }
    const token = this.authService.verifyJWT(authHeader.split(' ')[1]);

    // create the new signature object
    const newSignature = await this.prisma.signature.create({
      data: {
        document_id: documentId,
        user_id: token.uid,
        user_name: token.username
      },
    });

    // add the new signature to the document's signatures array
    document.signatures.push(newSignature);
  }

  async putUnsign(documentId: number, authHeader: string) {
    const token = this.authService.verifyJWT(authHeader.split(' ')[1]);
    await this.prisma.signature.deleteMany({
      where: {
          document_id: documentId,
          user_id: token.uid,
      },
    })
  }

  async deleteDoc(documentId: number) {
    await this.prisma.document.delete({
      where: {
          document_id: documentId,
      },
    })
  }
}
