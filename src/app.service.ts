import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  async getCurrentDirection(latitude: string, longitude: string): Promise<any> {
    try {
      const res = await fetch(
        `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${longitude},${latitude}&output=json&orders=addr,admcode`,
        {
          mode: 'cors',
          headers: new Headers({
            'X-NCP-APIGW-API-KEY-ID':
              this.configService.get<string>('CLIENT_ID'),
            'X-NCP-APIGW-API-KEY':
              this.configService.get<string>('CLIENT_SECRET'),
          }),
        },
      );
      const currentLocation = await res.json();
      const mergeCurrentLocation = `${currentLocation?.results[0]?.region.area1.name} ${currentLocation?.results[0]?.region.area2.name} ${currentLocation?.results[0]?.region.area3.name} ${currentLocation?.results[0]?.region.area4.name}${currentLocation?.results[0]?.land.number1}-${currentLocation?.results[0]?.land.number2}`;
      const data = await fetch(
        `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${mergeCurrentLocation}`,
        {
          mode: 'cors',
          headers: new Headers({
            'X-NCP-APIGW-API-KEY-ID':
              this.configService.get<string>('CLIENT_ID'),
            'X-NCP-APIGW-API-KEY':
              this.configService.get<string>('CLIENT_SECRET'),
          }),
        },
      );
      const result = await data.json();

      return {
        currentLocation: result?.addresses[0].roadAddress,
        x: result?.addresses[0].x,
        y: result?.addresses[0].y,
      };
    } catch (err) {
      console.log(err);
    }
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

    return {
      addresses:
        data?.addresses.length === 0
          ? []
          : {
              roadAddress: data?.addresses[0].roadAddress,
              x: data?.addresses[0].x,
              y: data?.addresses[0].y,
            },
    };
  }

  async getDestination(sx: string, sy: string, ex: string, ey: string) {
    console.log(
      encodeURIComponent(this.configService.get<string>('ODSAY_KEY')),
    );
    const destination = await fetch(
      `https://api.odsay.com/v1/api/searchPubTransPathT?SX=${sx}&SY=${sy}&EX=${ex}&EY=${ey}&OPT=1&apiKey=${encodeURIComponent(
        this.configService.get<string>('ODSAY_KEY'),
      )}`,
    );

    const data = await destination.json();

    return { data };
  }
}
