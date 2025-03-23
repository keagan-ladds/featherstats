import { db } from "@featherstats/database"
import { usersTable } from "@featherstats/database/schema/auth"
import { User, UserMetadata } from "@featherstats/database/types"
import { eq, sql } from "drizzle-orm";
import { UpdateUserPreferencesOptions, UserProfile } from "types/user";

class UserService {
    async getUserById(id: string): Promise<User | undefined> {
        const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id));
        return user;
    }

    async getUserProfileById(id: string): Promise<UserProfile> {
        const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id));

        if (!user) throw new Error('User not found');

        return {
            ...user
        }
    }

    async updateUserProfileById(id: string, opts: UpdateUserPreferencesOptions): Promise<void> {
        const user = await this.getUserById(id);
        if (!user) throw new Error("User not found");

        await db.update(usersTable)
            .set({
                name: opts.name,
                preferences: {
                    ...user.preferences,
                    clarifyModeEnabled: opts.clarityModeEnabled,
                    theme: opts.theme
                }
            }).where(eq(usersTable.id, id));
    }

    async updateUserMetadataById(id: string, metadata: Partial<UserMetadata>) {
        await db.update(usersTable).set({ metadata: metadata }).where(eq(usersTable.id, id));
    }

    async updateUserById(id: string, data: Partial<Omit<User, 'id'>>): Promise<User> {
        const [user] = await db.update(usersTable)
            .set({ ...data })
            .where(eq(usersTable.id, id)).returning();

        if (!user) throw new Error(`Failed to update, user with id '${id}' could not be found`);

        return user;
    }
}

export const userService = new UserService()