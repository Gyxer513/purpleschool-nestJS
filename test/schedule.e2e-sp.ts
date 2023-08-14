/* import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';

describe('AppController (e2e)', () => {
  let app: INestApplication;

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
 
   it('/rooms/:id (DELETE)', () => {
     return request(app.getHttpServer())
       .delete('/rooms/' + createdId)
       .send(testDto)
       .expect(200);
   });
  
  afterAll(() => {
    disconnect();
  });
}); */