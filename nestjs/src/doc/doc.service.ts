import { Injectable } from "@nestjs/common";
import { WriteDocDto } from "./dto/write_doc.dto";
import { DetailDocData, ListDocData } from "./entities/doc.entity";

@Injectable()
export class DocService {
  private list_datas: ListDocData[] = [];
  private detail_data: DetailDocData;

  getDocList() {
    //get data from db and make array of listDocData
    return [
      {
        document_id: 1,
        title: "test",
        thumbnail: "test",
        signature_count: 20,
      },
      {
        document_id: 2,
        title: "test",
        thumbnail: "test",
        signature_count: 20,
      },
      {
        document_id: 3,
        title: "test",
        thumbnail: "test",
        signature_count: 20,
      },
      {
        document_id: 4,
        title: "test",
        thumbnail: "test",
        signature_count: 20,
      },
      {
        document_id: 5,
        title: "test",
        thumbnail: "test",
        signature_count: 20,
      },
    ];
  }

  writeDoc(writeData: WriteDocDto) {
    // write data to db;
  }

  getDoc(documentId: Number) {
    //get data from db and return
  }

  putSign(documentId: Number) {
    //update sign table
  }

  putUnsign(documentId: Number) {
    //update sign table
  }

  deleteDoc(documentId: Number) {
    //delete doc
  }
}
