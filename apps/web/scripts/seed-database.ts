import { db } from "@featherstats/database"
import { usersTable } from '@featherstats/database/schema/auth';
import { generateUniqueString } from '@featherstats/database/util';
import { domainsTable, workspaceUsersTable, workspacesTable } from '@featherstats/database/schema/app';

const domainId = generateUniqueString();

await db.insert(usersTable).values({ id: "lt2558OZBfiu", name: "Keagan Ladds", email: "ladds.k@gmail.com" }).onConflictDoNothing();
await db.insert(workspacesTable).values({ id: 'featherstats', name: "Default Workspace" }).onConflictDoNothing();
await db.insert(workspaceUsersTable).values({ userId: "lt2558OZBfiu", workspaceId: 'featherstats' }).onConflictDoNothing();
await db.insert(domainsTable).values({ id: "5kmlajx43xfp", name: "www.shop-n-scrap.co.za", workspaceId: 'featherstats', verificationStatus: 'verified' }).onConflictDoNothing();