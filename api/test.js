import param from './config/parameters.js'

const PORT = 3000

console.log(`server listening on port http://localhost:${PORT}`)
console.log(param.url.control)
console.log(param.url.public)
console.log(param.body.assets)