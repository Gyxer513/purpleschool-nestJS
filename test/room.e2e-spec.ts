import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateRoomDto } from 'src/rooms/dto/create-room.dto';
import { disconnect } from 'mongoose';
import { CreateScheduleDto } from 'src/schedule/dto/create-schedule.dto';

const testRoomDto: CreateRoomDto = {
  number: '9999',
  description: 'TEST ROOM',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdRoomId: string;
  let createdSheduleId: string;

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
      .send(testRoomDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdRoomId = body._id;
        expect(createdRoomId).toBeDefined();
      });
  });

  it('/schedule (POST)', async () => {
    await request(app.getHttpServer())
      .post('/schedule')
      .send({
        roomId: createdRoomId,
        date: '18.02.2003',
      })
      .expect(201)
      .then(({ body }: request.Response) => {
        createdSheduleId = body._id;
        expect(createdSheduleId).toBeDefined();
      });
  });

  it('/rooms (GET)', async () => {
    await request(app.getHttpServer())
      .get('/rooms')
      .send({ number: testRoomDto.number })
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.number).toBe(testRoomDto.number);
      });
  });

  it('/schedule/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/schedule/' + createdSheduleId)
      .send(testRoomDto)
      .expect(200);
  });

  it('/rooms/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/rooms/' + createdRoomId)
      .send(testRoomDto)
      .expect(200);
  });

  afterAll(() => {
    disconnect();
  });
});
