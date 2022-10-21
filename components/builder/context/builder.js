import {createContext, useContext} from "react";

const BuilderContext = createContext({})
export const useBuilder = () => useContext(BuilderContext)
export default BuilderContext