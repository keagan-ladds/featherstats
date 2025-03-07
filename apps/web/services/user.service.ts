import { db } from "@featherstats/database"
import { usersTable } from "@featherstats/database/schema/auth"
import { User, UserMetadata } from "@featherstats/database/types"
import { eq, sql } from "drizzle-orm";

class UserService {
    async getUserById(id: string): Promise<User | undefined> {
        const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id));
        return user;
    }

    async updateUserMetadataById(id: string, metadata: Partial<UserMetadata>) {
        await db.update(usersTable).set({metadata: metadata}).where(eq(usersTable.id, id));
    }
}

export const userService = new UserService()