import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { FtGuard, JwtGuard } from './ftGuard/ft.guard';
import { Payload } from './decorator/payload.decorator';
import { Profile } from "passport-42";
import { UserProfile } from "./user.interface";
import { AuthService } from "./auth.service";
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
    constructor(
        private config: ConfigService,
        private authService: AuthService,
      ) {}

    @Get('ft_profile')
    @UseGuards(JwtGuard)
    async ft_profile(@Payload() profile: UserProfile) {
    	return profile;
    }

    @Get('ft_login')
    @UseGuards(FtGuard)
    async ft_login() {
        return ;
    }

    @Get('ft_callback')
    @UseGuards(FtGuard)
    async ft_callback(@Payload() profile: Profile, @Res() res) {
        const data = await this.authService.login(profile);
        if (!data.accessToken) return ;
        
        const url = new URL('http://localhost');
        url.port = this.config.get<string>('FRONTEND_PORT');
        url.searchParams.set('token', data.accessToken);
        url.searchParams.set('rtoken', data.refreshToken);
        url.pathname = 'home';

        res.status(302).redirect(url.href);
    }
}