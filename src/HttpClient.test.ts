/* eslint-disable no-console */
import axios from 'axios';
import Axios from 'axios';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { createCancelToken } from './CancelToken';

import { HttpClient } from './index';

const server = setupServer(
  rest.get('http://localhost:3000/todos', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
  rest.post('http://localhost:3000/todos', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        message: 'Ok'
      })
    );
  }),
  rest.put('http://localhost:3000/todos/:id', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        message: 'Ok'
      })
    );
  }),
  rest.patch('http://localhost:3000/todos/:id', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        message: 'Ok'
      })
    );
  }),
  rest.delete('http://localhost:3000/todos/:id', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Ok'
      })
    );
  })
);

beforeAll(() => server.listen());

afterAll(() => server.close());

afterEach(() => server.resetHandlers());

describe('HttpClient', () => {
  type Todo = { name: string };
  const httpClient = new HttpClient({ baseUrl: 'http://localhost:3000' });

  it('should retrieve the todos with the get method', async () => {
    try {
      const response = await httpClient.get({ pathname: '/todos' });
      expect(response.data).toEqual([]);
    } catch (err) {
      console.log('err', err);
    }
  });

  it('should retrieve the todos with the get method and use generics', async () => {
    const todos: Todo[] = [{ name: 'todo' }];
    server.use(
      rest.get('http://localhost:3000/todos', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(todos));
      })
    );

    try {
      const response = await httpClient.get<Todo[]>({ pathname: '/todos' });
      expect(response.data).toEqual(todos);
    } catch (err) {
      console.log('err', err);
    }
  });

  it('should retrieve filtered todos using the params option', async () => {
    const todos: Todo[] = [{ name: 'todo' }];
    server.use(
      rest.get('http://localhost:3000/todos', (req, res, ctx) => {
        const limit = parseInt(req.url.searchParams.get('limit') as string, 10);
        return res(ctx.status(200), ctx.json({ limit }));
      })
    );

    const limit = 20;

    try {
      const response = await httpClient.get<Todo[]>({
        pathname: '/todos',
        params: { limit }
      });
      expect(response.data).toEqual({ limit });
    } catch (err) {
      console.log('err', err);
    }
  });

  it('should retrieve an error when the get returns an error', async () => {
    server.use(
      rest.get('http://localhost:3000/todos', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    try {
      await httpClient.get<Todo[]>({ pathname: '/todos' });
    } catch (err) {
      expect(err.response.status).toBe(500);
    }
  });

  it('should post a todo', async () => {
    try {
      const response = await httpClient.post<Todo, { message: string }>({
        pathname: '/todos',
        payload: { name: 'todo' }
      });

      expect(response.status).toBe(201);
      expect(response.data.message).toBe('Ok');
    } catch (err) {
      console.log('err', err);
    }
  });

  it('should post a todo but api answers with error', async () => {
    server.use(
      rest.post('http://localhost:3000/todos', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    try {
      await httpClient.post<Todo, { message: string }>({
        pathname: '/todos',
        payload: { name: 'todo' }
      });
    } catch (err) {
      expect(err.response.status).toBe(500);
    }
  });

  it('should update a todo', async () => {
    try {
      const response = await httpClient.put<Todo, { message: string }>({
        pathname: '/todos/1',
        payload: { name: 'todo' }
      });

      expect(response.status).toBe(201);
      expect(response.data.message).toBe('Ok');
    } catch (err) {
      console.log('err', err);
    }
  });

  it('should update a todo but api answers with error', async () => {
    server.use(
      rest.put('http://localhost:3000/todos/:id', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    try {
      await httpClient.put<Todo, { message: string }>({
        pathname: '/todos/1',
        payload: { name: 'todo' }
      });
    } catch (err) {
      expect(err.response.status).toBe(500);
    }
  });

  it('should patch a todo', async () => {
    try {
      const response = await httpClient.patch<Todo, { message: string }>({
        pathname: '/todos/1',
        payload: { name: 'todo' }
      });

      expect(response.status).toBe(201);
      expect(response.data.message).toBe('Ok');
    } catch (err) {
      console.log('err', err);
    }
  });

  it('should patch a todo but api answers with error', async () => {
    server.use(
      rest.patch('http://localhost:3000/todos/:id', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    try {
      await httpClient.patch<Todo, { message: string }>({
        pathname: '/todos/1',
        payload: { name: 'todo' }
      });
    } catch (err) {
      expect(err.response.status).toBe(500);
    }
  });

  it('should delete a todo', async () => {
    try {
      const response = await httpClient.delete<{ message: string }>({
        pathname: '/todos/1'
      });

      expect(response.status).toBe(200);
      expect(response.data.message).toBe('Ok');
    } catch (err) {
      console.log('err', err);
    }
  });

  it('should delete a todo but api answers with error', async () => {
    server.use(
      rest.delete('http://localhost:3000/todos/:id', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    try {
      await httpClient.delete<{ message: string }>({
        pathname: '/todos/1'
      });
    } catch (err) {
      expect(err.response.status).toBe(500);
    }
  });

  describe('Headers', () => {
    const httpClient = new HttpClient({
      baseUrl: 'http://localhost:3000',
      headers: { Authorization: 'token 1234' }
    });

    it('should include the headers while getting', async () => {
      try {
        const response = await httpClient.get<{ message: string }>({
          pathname: '/todos'
        });

        expect(response.request.requestHeaders.Authorization).toBe(
          'token 1234'
        );
      } catch (err) {
        console.log('err', err);
      }
    });

    it('should include the headers while post', async () => {
      try {
        const response = await httpClient.post<Todo, { message: string }>({
          pathname: '/todos',
          payload: { name: 'todo' }
        });

        expect(response.request.requestHeaders.Authorization).toBe(
          'token 1234'
        );
      } catch (err) {
        console.log('err', err);
      }
    });

    it('should include the headers while put', async () => {
      try {
        const response = await httpClient.put<Todo, { message: string }>({
          pathname: '/todos/1',
          payload: { name: 'todo' }
        });

        expect(response.request.requestHeaders.Authorization).toBe(
          'token 1234'
        );
      } catch (err) {
        console.log('err', err);
      }
    });

    it('should include the headers while patch', async () => {
      try {
        const response = await httpClient.patch<Todo, { message: string }>({
          pathname: '/todos/1',
          payload: { name: 'todo' }
        });

        expect(response.request.requestHeaders.Authorization).toBe(
          'token 1234'
        );
      } catch (err) {
        console.log('err', err);
      }
    });

    it('should include the headers while deleting', async () => {
      try {
        const response = await httpClient.delete<{ message: string }>({
          pathname: '/todos/1'
        });

        expect(response.request.requestHeaders.Authorization).toBe(
          'token 1234'
        );
      } catch (err) {
        console.log('err', err);
      }
    });
  });

  describe('Options', () => {
    const httpClient = new HttpClient({
      baseUrl: 'http://localhost:3000',
      headers: { Authorization: 'token 1234' }
    });

    it('should get with arraybuffer for binary operations', async () => {
      try {
        const response = await httpClient.get<Todo>({
          pathname: '/todos',
          options: { responseType: 'arraybuffer' }
        });
        expect(response.status).toBe(200);
        expect(response.config.responseType).toBe('arraybuffer');
        expect(response.data).toBeInstanceOf(Uint8Array);
      } catch (err) {
        console.log(err);
      }
    });

    it('should create post with arraybuffer for binary operations', async () => {
      try {
        const response = await httpClient.post<Todo, { message: string }>({
          pathname: '/todos',
          payload: { name: 'todo' },
          options: { responseType: 'arraybuffer' }
        });
        expect(response.status).toBe(201);
        expect(response.config.responseType).toBe('arraybuffer');
        expect(response.data).toBeInstanceOf(Uint8Array);
      } catch (err) {
        console.log(err);
      }
    });

    it('should update a todo with arraybuffer for binary operations', async () => {
      try {
        const response = await httpClient.put<Todo, { message: string }>({
          pathname: '/todos/1',
          payload: { name: 'todo' },
          options: { responseType: 'arraybuffer' }
        });

        expect(response.status).toBe(201);
        expect(response.config.responseType).toBe('arraybuffer');
        expect(response.data).toBeInstanceOf(Uint8Array);
      } catch (err) {
        console.log('err', err);
      }
    });

    it('should patch with arraybuffer for binary operations', async () => {
      try {
        const response = await httpClient.patch<Todo, { message: string }>({
          pathname: '/todos/1',
          payload: { name: 'todo' },
          options: { responseType: 'arraybuffer' }
        });

        expect(response.status).toBe(201);
        expect(response.config.responseType).toBe('arraybuffer');
        expect(response.data).toBeInstanceOf(Uint8Array);
      } catch (err) {
        console.log('err', err);
      }
    });

    it('should delete a todo with arraybuffer for binary operations', async () => {
      try {
        const response = await httpClient.delete<{ message: string }>({
          pathname: '/todos/1',
          options: { responseType: 'arraybuffer' }
        });

        expect(response.status).toBe(200);
        expect(response.config.responseType).toBe('arraybuffer');
        expect(response.data).toBeInstanceOf(Uint8Array);
      } catch (err) {
        console.log('err', err);
      }
    });
  });

  describe('CancelToken', () => {
    it('should pass a cancelToken to a get request', async () => {
      expect.assertions(1);

      const cancelToken = createCancelToken();
      expect(
        httpClient.get({
          pathname: '/todos',
          options: { cancelToken }
        })
      ).rejects.toBeInstanceOf(axios.Cancel);

      cancelToken.cancel();
    });

    it('should pass a cancelToken to a post request', async () => {
      expect.assertions(1);

      const cancelToken = createCancelToken();
      expect(
        httpClient.post({
          pathname: '/todos',
          payload: null,
          options: { cancelToken }
        })
      ).rejects.toBeInstanceOf(axios.Cancel);

      cancelToken.cancel();
    });

    it('should pass a cancelToken to a put request', async () => {
      expect.assertions(1);

      const cancelToken = createCancelToken();
      expect(
        httpClient.put({
          pathname: '/todos',
          payload: null,
          options: { cancelToken }
        })
      ).rejects.toBeInstanceOf(axios.Cancel);

      cancelToken.cancel();
    });

    it('should pass a cancelToken to a delete request', async () => {
      expect.assertions(1);

      const cancelToken = createCancelToken();
      expect(
        httpClient.delete({
          pathname: '/todos',
          options: { cancelToken }
        })
      ).rejects.toBeInstanceOf(axios.Cancel);

      cancelToken.cancel();
    });
  });
});
