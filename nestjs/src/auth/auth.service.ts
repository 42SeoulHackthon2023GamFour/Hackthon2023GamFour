import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { FortyTwoUserProfile } from "./user.interface";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private config: ConfigService, ) {}
  async genAuthToken(user: FortyTwoUserProfile): Promise<string> {
    return this.jwtService.signAsync(
      {
        uid: user.id,
        username: user.username,
      },
      {
        secret: this.config.get<string>("JWT_SECRET"),
        expiresIn: this.config.get<string>("JWT_VTIME"),
      }
    );
  }

  async genRefreshToken(user: FortyTwoUserProfile): Promise<string> {
    const token = this.jwtService.sign(
      {
        uid: user.id,
        username: user.username,
      },
      {
        secret: this.config.get<string>("JWTREF_SECRET"),
        expiresIn: this.config.get<string>("JWTREF_VTIME"),
      }
    );

    // await this.userService.saveRefreshToken(uid, token);
    return token;
  }

  async login(user: FortyTwoUserProfile): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    // this.userService.updateLTT(uid);
    const token = await this.genAuthToken(user);
    const rtoken = await this.genRefreshToken(user);
    return {
      accessToken: token,
      refreshToken: rtoken,
    };
  }
}
