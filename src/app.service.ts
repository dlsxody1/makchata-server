import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  async getCurrentDirection(latitude: string, longitude: string): Promise<any> {
    console.log(latitude, longitude);
    const res = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${longitude},${latitude}&output=json`,
      {
        mode: 'cors',
        headers: new Headers({
          'X-NCP-APIGW-API-KEY-ID': this.configService.get<string>('CLIENT_ID'),
          'X-NCP-APIGW-API-KEY':
            this.configService.get<string>('CLIENT_SECRET'),
        }),
      },
    );
    const data = await res.json();
    console.log(data);
    return data;
  }

  async getCurrentLocation(search: string): Promise<any> {
    const res = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${search}`,
      {
        mode: 'cors',
        headers: new Headers({
          'X-NCP-APIGW-API-KEY-ID': this.configService.get<string>('CLIENT_ID'),
          'X-NCP-APIGW-API-KEY':
            this.configService.get<string>('CLIENT_SECRET'),
        }),
      },
    );

    const data = await res.json();
    console.log(data);
    return data;
  }
}
