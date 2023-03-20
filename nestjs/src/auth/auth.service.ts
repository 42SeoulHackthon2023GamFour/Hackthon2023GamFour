import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Profile } from "passport-42";
import { UserProfile } from "./user.interface";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService, 
		private config: ConfigService,
	) {}
	
  async createUserHash(userid: number, username: string): Promise<string> {
	const secret = this.config.get<string>("JWT_SECRET");
	const message = userid.toString() + username + secret;
	const salt = await bcrypt.genSalt(4);
	const hash = await bcrypt.hash(message, salt);
	return hash;
  }

  async genAuthToken(payload: UserProfile): Promise<string> {
	const options = {
		secret: this.config.get<string>("JWT_SECRET"),
		expiresIn: this.config.get<string>("JWT_VTIME"),
	};
	const token = this.jwtService.signAsync(payload, options);
	return token;
  }

  async genRefreshToken(payload: UserProfile): Promise<string> {
	const options = {
		secret: this.config.get<string>("JWTREF_SECRET"),
        expiresIn: this.config.get<string>("JWTREF_VTIME"),
	};
	const token = this.jwtService.signAsync(payload, options);
	// await this.userService.saveRefreshToken(uid, token);
	return token;
  }

  async login(profile: Profile): Promise<{
	  accessToken: string;
	  refreshToken: string;
  }> {
    let user: UserProfile = {
	    userid: parseInt(profile.id),
	    username: profile.username,
	    userhash: await this.createUserHash(profile.id, profile.username),
    };
	// this.userService.updateLTT(uid);
    const token = await this.genAuthToken(user);
    const rtoken = await this.genRefreshToken(user);
    return {
      accessToken: token,
      refreshToken: rtoken,
    };
  }
}
