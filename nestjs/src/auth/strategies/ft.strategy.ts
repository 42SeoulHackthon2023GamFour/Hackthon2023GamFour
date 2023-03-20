import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-42";
import { AuthService } from "../auth.service";

@Injectable()
export class FtStrategy extends PassportStrategy(Strategy, '42') {
  constructor(
    private config: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: config.get<string>("FT_API_CID"),
      clientSecret: config.get<string>("FT_API_SEC"),
      callbackURL: config.get<string>("FT_API_CALLBACK"),
    });
  }

  async validate(
	  accessToken: string,
	  refreshToken: string,
	  profile: Profile,
  ): Promise<any> {
	  console.log('accessToken : ', accessToken);	// auto in passport
	  console.log('refreshToken : ', refreshToken);	// auto in passport
	  return profile;
  }
}