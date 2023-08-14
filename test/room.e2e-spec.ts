import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateRoomDto } from 'src/rooms/dto/create-room.dto';
import { disconnect } from 'mongoose';

const testDto: CreateRoomDto = {
  number: '9999',
  description: 'TEST ROOM',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/rooms (POST)', async () => {
    await request(app.getHttpServer())
      .post('/rooms')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
      });
  });

  it('/rooms (GET)', async () => {
    await request(app.getHttpServer())
      .get('/rooms')
      .send({ number: testDto.number })
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.number).toBe(testDto.number);
      });
  });

  it('/rooms/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/rooms/' + createdId)
      .send(testDto)
      .expect(200);
  });

  afterAll(() => {
    jest.setTimeout();
    disconnect();
  });
});
