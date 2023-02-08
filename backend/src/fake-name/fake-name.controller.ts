import { Controller, Get } from '@nestjs/common';
import { FakeNameService } from './fake-name.service';

@Controller('fake-name')
export class FakeNameController {
    constructor(private readonly fakeNameService: FakeNameService){}
    @Get("")
    async test(){
        return this.fakeNameService.fetch_identity("english-united-states", "male");
    }
}
