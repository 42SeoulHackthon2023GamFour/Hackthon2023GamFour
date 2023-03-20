import { Body, Controller, Delete, Get, Headers, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/ftGuard/ft.guard';
import { DocService } from './doc.service';
import { WriteDocDto } from './dto/write_doc.dto';

@Controller('doc')
@UseGuards(JwtGuard)
export class DocController {
	constructor(readonly docService: DocService) {}

	@Get('list') 
	getDocList() {
		return this.docService.getDocList()
	}

	@Post('write')
	writeDoc(@Body() writeData: WriteDocDto, @Req() request) {
		return this.docService.writeDoc(writeData, request.user);
	}

	@Get('/detail/:document_id')
	getDoc(@Param('document_id') documentId: number, @Req() request) {
		return this.docService.getDoc(documentId, request.user);
	}

	@Put('sign/:document_id')	
	putSign(@Param('document_id') documentId: number, @Req() request) {
		return this.docService.putSign(documentId, request.user);
	}

	@Put('unsign/:document_id')
	putUnsign(@Param('document_id') documentId: number,  @Req() request) {
		return this.docService.putUnsign(documentId, request.user);
	}

	@Delete('delete/:document_id')
	deleteDoc(@Param('document_id') documentId: number) {
		return this.docService.deleteDoc(documentId);
	}
}
