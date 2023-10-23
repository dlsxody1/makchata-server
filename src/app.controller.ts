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
  post(
    @Query('search') search: string,
    @Query('departure') departure: string,
  ): Promise<any> {
    return this.appService.getCurrentLocation(search, departure);
  }

  @Get('/destination')
  getDestination(
    @Query('sx') sx: string,
    @Query('sy') sy: string,
    @Query('ex') ex: string,
    @Query('ey') ey: string,
  ): Promise<any> {
    return this.appService.getDestination(sx, sy, ex, ey);
  }
}
