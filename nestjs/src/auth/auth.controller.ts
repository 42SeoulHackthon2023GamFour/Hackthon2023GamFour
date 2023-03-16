import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { FtGuard } from './ftGuard/ft.guard';
import { Payload } from './decorator/payload.decorator';
import { FortyTwoUserProfile } from './user.interface';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
    constructor(
        private config: ConfigService,
        private authService: AuthService,
      ) {}
      
    @Get('ft_login')
    @UseGuards(FtGuard)
    ft_login(): string {
        console.log("ft_login");
        return ("test");
    }
    @Get('ft_callback')
    @UseGuards(FtGuard)
    async ft_callback(@Payload() user: FortyTwoUserProfile, @Res() res) {
        const data = await this.authService.login(user);
        if (!data.accessToken) return;
    
        const url = new URL(this.config.get<string>('HOST_URL'));
        url.port = this.config.get<string>('FRONT_PORT');
        url.searchParams.set('token', data.accessToken);
        url.searchParams.append('rtoken', data.refreshToken);
        url.pathname = this.config.get<string>('FRONT_LOGIN_URL');
    
        res.status(302).redirect(url.href);
      }
}
