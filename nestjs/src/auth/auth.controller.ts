import { Controller, Get, UseGuards } from '@nestjs/common';
import { FtGuard } from './ftGuard/ft.guard';

@Controller('auth')
export class AuthController {
    @Get('ft_login')
    @UseGuards(FtGuard)
    ft_login(): void {}
}
