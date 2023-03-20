import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtGuard } from './ftGuard/ft.guard';
import { JwtStrategy } from "./strategies/jwt.strategy";
import { FtStrategy } from "./strategies/ft.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_VTIME },
    }),
  ],
  providers: [FtStrategy, JwtStrategy, JwtGuard, AuthService],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
