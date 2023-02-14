import { Module } from '@nestjs/common';
import { FakeNameService } from './fake-name.service';
import { FakeNameController } from './fake-name.controller';

@Module({
  providers: [FakeNameService],
  controllers: [FakeNameController],
  exports: [FakeNameService]
})
export class FakeNameModule {}
