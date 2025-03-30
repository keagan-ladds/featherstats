import { db } from "@featherstats/database"
import { planPricesTable, plansTable } from '@featherstats/database/schema/app';


// Add Initial Plans
await db.insert(plansTable).values({ id: "3B1TTA2jObKW", name: "Free", stripeProductId: "prod_S1hh7WA2nwMPjl", usageLimits: { maxMonthlyPageviews: 10000, maxDomains: 1, maxWorkspaces: 1, dataRetentionDays: 90 } }).onConflictDoNothing();
await db.insert(plansTable).values({ id: "PN8P5DTKBIPY", name: "Growth", stripeProductId: "prod_S2NxdHW1uxXvhX", usageLimits: { maxMonthlyPageviews: 50000, maxDomains: 3, maxWorkspaces: 2, dataRetentionDays: 365 } }).onConflictDoNothing();
await db.insert(plansTable).values({ id: "TbCH5CA7NofM", name: "Scale", stripeProductId: "prod_S2O2g6FWQ4p1kF", usageLimits: { maxMonthlyPageviews: 100000, maxDomains: 10, maxWorkspaces: 5, dataRetentionDays: 365 } }).onConflictDoNothing();

await db.insert(planPricesTable).values({ id: "5kTC9YOcoOaZ", planId: "3B1TTA2jObKW", billingPeriod: "monthly", currency: "usd", stripePriceId: "price_1R8J8HCHv2qPXSvbylOQd1eZ" }).onConflictDoNothing();
await db.insert(planPricesTable).values({ id: "8sqFfCtopzsl", planId: "PN8P5DTKBIPY", billingPeriod: "monthly", amount: 900, currency: "usd", stripePriceId: "price_1R8JBoCHv2qPXSvbwFEhm2pT" }).onConflictDoNothing();
await db.insert(planPricesTable).values({ id: "IwLcar8QqaQE", planId: "PN8P5DTKBIPY", billingPeriod: "yearly", amount: 9000, currency: "usd", stripePriceId: "price_1R8JDdCHv2qPXSvbtVDZXjKm" }).onConflictDoNothing();
await db.insert(planPricesTable).values({ id: "TWk23xB0w5uH", planId: "TbCH5CA7NofM", billingPeriod: "monthly", amount: 1800, currency: "usd", stripePriceId: "price_1R8JGKCHv2qPXSvbU5L0VnRn" }).onConflictDoNothing();
await db.insert(planPricesTable).values({ id: "Z6CvpEDUz9qE", planId: "TbCH5CA7NofM", billingPeriod: "yearly", amount: 17900, currency: "usd", stripePriceId: "price_1R8JGKCHv2qPXSvbcdnT16qt" }).onConflictDoNothing();