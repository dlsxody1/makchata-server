import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
  ): Promise<any> {
    return this.appService.getCurrentDirection(latitude, longitude);
  }

  @Get('/search')
  post(@Query('search') search: string): Promise<any> {
    return this.appService.getCurrentLocation(search);
  }
}
