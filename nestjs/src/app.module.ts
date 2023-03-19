import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerMiddleware } from "./logger/logger.middleware";
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from "@nestjs/config";
import { DocModule } from './doc/doc.module';
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  // imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true }), DocModule],
  imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true }), DocModule, PrismaModule],
  // controllers: [AppController, AuthController],
  controllers: [AppController, AuthController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
