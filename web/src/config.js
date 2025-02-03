export default {
  server: {
    host: "localhost",
    port: 5010
  },
  api: {
    host: "http://localhost",
    port: 9010
  },
  provider: {
    host: "http://localhost",
    port: {
      default: 19191, 
      control: 19192,
      management: 19193,
      protocol: 19194,
      public: 19291
    },
    get publicUrl() {
      return `${this.host}:${this.port.public}/public`;
    },
    user: 'EDC-provider'
  }
}