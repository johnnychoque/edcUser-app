module.exports = {
  provider: {
    host: "http://localhost",
    port: {
      default: 19191, 
      control: 19192,
      management: 19193,
      protocol: 19194,
      public: 19291
    },
    datasource: "https://jsonplaceholder.typicode.com/users"
  },
  consumer: {
    host: "http://localhost",
    port: {
      default: 29191, 
      control: 29192,
      management: 29193,
      protocol: 29194,
      public: 29291
    }
  },
  server: {
    host: "http://localhost",
    port: 9010,
    secret: 'EsteEsUnGranSecreto'
  },
  oauth: {
    authorizationURL: 'http://localhost:8080/oauth2/authorize',
    tokenURL: 'http://localhost:8080/oauth2/token',
    clientID: 'ddd87522-c61a-4e79-89b3-08b8e08e77a1',
    clientSecret: '30ad2bbb-2a53-4550-9ee8-7636752bacf6',
    get callbackURL() {
      return `${module.exports.server.host}:${module.exports.server.port}/auth/callback`;
    },
    scope: 'connector',
    state: 'abcd'
  },
  bae: {
    host: 'http://localhost',
    port: 8004
  },
  web: {
    host: 'http://localhost',
    port: 5010,
    get url() {
      return `${module.exports.web.host}:${module.exports.web.port}`;
    }
  },
  idm: {
    host: 'http://localhost',
    port: 8080,
    get url() {
      return `${module.exports.idm.host}:${module.exports.idm.port}`;
    }
  }
}
