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
    console.log(data.results[0].region.area1.name, '경기');
    console.log(data.results[0].region.area2.name, '화성시');
    console.log(data.results[0].region.area3.name, '팔단면');
    console.log(data.results[0].region.area4.name, '덕우리');
    return {
      location: `${data.results[0].region.area1.name} ${data.results[0].region.area2.name} ${data.results[0].region.area3.name} ${data.results[0].region.area4.name}`,
    };
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
    console.log(data.addresses[0].roadAddress);
    return { location: data.addresses[0].roadAddress };
  }
}
