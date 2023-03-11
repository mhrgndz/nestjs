import { Injectable } from '@nestjs/common';

@Injectable()
export default class AppService {
  index(): string {
    return 'Welcome !';
  }
}
