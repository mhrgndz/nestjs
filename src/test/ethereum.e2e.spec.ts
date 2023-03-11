import { Test, TestingModule } from '@nestjs/testing';
import { EthereumController } from '../controllers/ethereum.controller';
import { INestApplication } from '@nestjs/common';
import AppModule from '../app.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

describe('EthereumController (e2e)', () => {
  let app: INestApplication;
  let controller: EthereumController;
  let http: HttpService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    controller = moduleFixture.get<EthereumController>(EthereumController);
    http = moduleFixture.get<HttpService>(HttpService);
  });

  describe('balance', () => {
    it('Ethereum request test', async () => {
      const response: AxiosResponse = await http
        .post('http://localhost:3000/ethereum/balance',{
        "id": "ethereum%2C",
        "currencies": "usd",
        "addressList" : ["0x52908400098527886E0F7030069857D2E4169EE7"]
      })
      .toPromise();
      expect(response.status).toEqual(201);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});