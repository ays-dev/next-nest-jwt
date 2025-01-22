import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let server: any;
  let token: string;

  const testEmail = `e2e-user-${Date.now()}@example.com`;
  const testPassword = 'testPassword123';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Register a new user (POST /auth/register)', async () => {
    const response = await request(server)
      .post('/auth/register')
      .send({ email: testEmail, password: testPassword })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('email', testEmail);
  });

  it('Login with user credentials (POST /auth/login)', async () => {
    const response = await request(server)
      .post('/auth/login')
      .send({ email: testEmail, password: testPassword })
      .expect(201);

    expect(response.body).toHaveProperty('access_token');
    token = response.body.access_token;
  });

  it('Get current user profile (GET /auth/profile)', async () => {
    const response = await request(server)
      .get('/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

      expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('email', testEmail);
  });
});
