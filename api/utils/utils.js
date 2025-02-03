import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

export const requireModule = (module) => require(module)