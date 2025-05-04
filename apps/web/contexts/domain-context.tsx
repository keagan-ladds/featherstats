import { Domain } from "@featherstats/database/types";
import { createContext } from "react";

interface DomainContext {
    domain: Domain
}

export const DomainContext = createContext<DomainContext | null>(null)