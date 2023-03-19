import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DocController } from './doc.controller';
import { DocService } from './doc.service';


@Module({
  imports: [AuthModule],
  controllers: [DocController],
  providers: [DocService]
})
export class DocModule {}
