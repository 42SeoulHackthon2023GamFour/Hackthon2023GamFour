import {  Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class FtGuard extends AuthGuard("42") {}

@Injectable()
export class JwtGuard extends AuthGuard("jwt") {}
