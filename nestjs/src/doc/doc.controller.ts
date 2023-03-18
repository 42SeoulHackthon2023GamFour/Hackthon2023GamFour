	import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
		writeDoc(@Body() writeData: WriteDocDto) {
			return this.docService.writeDoc(writeData);
		}

		@Get('/detail/:document_id')
		getDoc(@Param('document_id') documentId: number) {
			return this.docService.getDoc(documentId);
		}

		@Put('sign/:document_id')	
		putSign(@Param('document_id') documentId: number) {
			return this.docService.putSign(documentId);
		}

		@Put('unsign/:document_id')
		putUnsign(@Param('document_id') documentId: number) {
			return this.docService.putUnsign(documentId);
		}

		@Delete('delete/:document_id')
		deleteDoc(@Param('document_id') documentId: number) {
			return this.docService.deleteDoc(documentId);
		}
	}
