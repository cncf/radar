import { createContext } from 'react'

const globals = JSON.parse(process.env.globals)
const GlobalsContext = createContext(globals)
export default GlobalsContext
