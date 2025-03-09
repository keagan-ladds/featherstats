import { createContext } from "react";

interface DomainContext {

}

export const DomainContext = createContext<DomainContext | null>(null)