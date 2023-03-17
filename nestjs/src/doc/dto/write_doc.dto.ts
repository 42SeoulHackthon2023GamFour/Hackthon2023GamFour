import { IsString } from "class-validator";

export class WriteDocDto {
	@IsString()
	readonly title: string;

	@IsString()
	readonly thumnbail: string;

	@IsString()
	readonly description: string;
}