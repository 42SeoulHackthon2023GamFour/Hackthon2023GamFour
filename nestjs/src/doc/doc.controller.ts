import { Body, Controller, Delete, Get, Headers, Param, Post, Put } from '@nestjs/common';
import { DocService } from './doc.service';
import { WriteDocDto } from './dto/write_doc.dto';

@Controller('doc')
export class DocController {
	constructor(readonly docService: DocService) {}

	@Get('list') 
	getDocList() {
		return this.docService.getDocList()
	}

	@Post('write')
	writeDoc(@Body() writeData: WriteDocDto, @Headers('authorization') authHeader: string) {
		return this.docService.writeDoc(writeData, authHeader);
	}

	@Get('/detail/:document_id')
	getDoc(@Param('document_id') documentId: number, @Headers('authorization') authHeader: string) {
		return this.docService.getDoc(documentId, authHeader);
	}

	@Put('sign/:document_id')	
	putSign(@Param('document_id') documentId: number, @Headers('authorization') authHeader: string) {
		return this.docService.putSign(documentId, authHeader);
	}

	@Put('unsign/:document_id')
	putUnsign(@Param('document_id') documentId: number,  @Headers('authorization') authHeader: string) {
		return this.docService.putUnsign(documentId, authHeader);
	}

	@Delete('delete/:document_id')
	deleteDoc(@Param('document_id') documentId: number) {
		return this.docService.deleteDoc(documentId);
	}

	@Put('dsign/:document_id')	
	putDummySign(@Param('document_id') documentId: number) {
		return this.docService.putDummySign(documentId);
	}

	@Put('dunsign/:document_id')
	putDummyUnsign(@Param('document_id') documentId: number) {
		return this.docService.putDummyUnsign(documentId);
	}
}
