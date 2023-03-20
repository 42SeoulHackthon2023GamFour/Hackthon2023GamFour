import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserProfile } from "../user.interface";
import { AuthService } from "../auth.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		private config: ConfigService,
		private authService: AuthService,
	  ) {
	  super({
		  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		  secretOrKey: config.get<string>("JWT_SECRET"),
	  });
  }
  async validate(payload: UserProfile) {
	const { userid, username, userhash } = payload;
	const secret = this.config.get<string>("JWT_SECRET");
	const message = userid.toString() + username + secret;
	if (!(await bcrypt.compare(message, userhash))) {
		throw new HttpException("Mismatch Token", HttpStatus.FORBIDDEN);
	}
	console.log('payload :', payload);
	return payload;
  }
}