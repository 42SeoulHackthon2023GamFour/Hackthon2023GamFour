export class ListDocData {
	document_id : number;
	title : string;
	thumbnail : string;
	signature_count : number;
}

export class DetailDocData {
	document_id : number;
	title: string;
	thumbnail : string;
	signature_count: number;
	description : string;
    author_id: number;
    author_name: string;
}
