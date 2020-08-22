# Http Client [![NPM Version](https://img.shields.io/npm/v/@rogal/http-client.svg)](https://www.npmjs.com/package/@rogal/http-client) [![NPM Downloads](https://img.shields.io/npm/dm/@rogal/http-client.svg)](https://www.npmjs.com/package/http-client) [![Actions Status](https://github.com/gabrielseco/http-client/workflows/ci/badge.svg)](https://github.com/gabrielseco/http-client/actions) [![Actions Status](https://github.com/gabrielseco/http-client/workflows/build/badge.svg)](https://github.com/gabrielseco/http-client/actions) [![Coverage Status](https://coveralls.io/repos/github/gabrielseco/http-client/badge.svg?branch=master)](https://coveralls.io/github/gabrielseco/http-client?branch=master)

> An adapter to make http requests and abstract from fetching packages

## Install

```sh
npm install @rogal/http-client --save
```

### Getting Started

```js
  const httpClient = new HttpClient({
    baseUrl: 'http://localhost:3001',
  });

  httpClient.get('/todos').then(response => {
    console.log('response', response);
  }).catch(err => {
    console.log('err doing response')
  })

```

### Methods 

* httpClient.get
* httpClient.post
* httpClient.put
* httpClient.delete


### Interceptor

We offer you an interceptor so you can observe calls.

```js
HttpClientInterceptor().then(response => {
  // do something with the response
}).catch(err => {
  // do something with the error
}) ;
```


### How to contribute

You can install and have an enviroment ready for use with Storybook

```sh
  npm i
  npm start
```

## License

MIT