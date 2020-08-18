/* eslint-disable no-console */
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { HttpClient, HttpClientInterceptor } from './index';

const server = setupServer(
  rest.get('http://localhost:3000/todos', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  })
);

beforeAll(() => server.listen());

afterAll(() => server.close());

afterEach(() => server.resetHandlers());

describe('HttpClient', () => {
  type Todo = { name: string };
  const httpClient = new HttpClient({ baseUrl: 'http://localhost:3000' });

  it('should work the httpClient when interceptor is called', async () => {
    expect.assertions(1);
    HttpClientInterceptor().catch((err) => {
      console.log('err interceptor', err);
    });
    try {
      const todos = await httpClient.get({ pathname: '/todos' });
      expect(todos.data).toEqual([]);
    } catch (err) {
      console.log('err', err);
    }
  });

  it('should catch the response with the interceptor when making a call', async () => {
    server.use(
      rest.get('http://localhost:3000/todos', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    expect.assertions(2);
    const promise = HttpClientInterceptor();

    try {
      await httpClient.get({ pathname: '/todos' });
    } catch (error) {
      expect(error.response.status).toBe(404);
    }

    return promise.catch((error) => {
      expect(error.response.status).toBe(404);
    });
  });
});
