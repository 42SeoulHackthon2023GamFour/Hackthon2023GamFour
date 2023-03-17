import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerMiddleware } from "./logger/logger.middleware";
import { TestModule } from "./test/test.module";
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from "@nestjs/config";
import { DocModule } from './doc/doc.module';

@Module({
  imports: [TestModule, AuthModule, ConfigModule.forRoot({ isGlobal: true }), DocModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
