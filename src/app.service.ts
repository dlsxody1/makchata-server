import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  async getCurrentDirection(latitude: string, longitude: string): Promise<any> {
    console.log(latitude, longitude);
    const res = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${longitude},${latitude}&output=json&orders=addr,admcode`,
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

    console.log(data.results[0].land.number1);
    //${data.results[1].land.number1}-${data.results[1].land.number2}
    return {
      location: `${data.results[0].region.area1.name} ${data.results[0].region.area2.name} ${data.results[0].region.area3.name} ${data.results[0].region.area4.name}${data.results[0].land.number1}-${data.results[0].land.number2}`,
    };
  }

  async getCurrentLocation(search: string, departure: string): Promise<any> {
    const res = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${search}&coordinate=${departure}`,
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
    return { addresses: data.addresses };
  }

  async getDestination() {
    const res = await fetch(
      'https://api.odsay.com/v1/api/searchPubTransPathT?SX=126.9027279&SY=37.5349277&EX=126.9145430&EY=37.5499421&apiKey=wOtSqgMKSMTUesQcMH0Yyw',
    );

    const data = await res.json();
    console.log(data);
    return { data };
  }
}
