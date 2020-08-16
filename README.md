# Http Adapter [![NPM Version](https://img.shields.io/npm/v/@rogal/http-adapter.svg)](https://www.npmjs.com/package/@rogal/http-adapter) [![NPM Downloads](https://img.shields.io/npm/dm/@rogal/http-adapter.svg)](https://www.npmjs.com/package/http-adapter) [![Actions Status](https://github.com/gabrielseco/http-adapter/workflows/tests/badge.svg)](https://github.com/gabrielseco/http-adapter/actions) [![Coverage Status](https://coveralls.io/repos/github/gabrielseco/http-adapter/badge.svg?branch=master)](https://coveralls.io/github/gabrielseco/http-adapter?branch=master)

> An adapter to make http requests and abstract from fetching packages

## Install

```sh
npm install @rogal/http-adapter --save
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


### How to contribute

You can install and have an enviroment ready for use with Storybook

```sh
  npm i
  npm start
```

## License

MIT