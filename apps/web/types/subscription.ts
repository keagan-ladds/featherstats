import { Plan, PlanPrice } from "@featherstats/database/types";

export type PlanWithPrices = Plan & {
    prices: PlanPrice[]
}