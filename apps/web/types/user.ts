import { User } from "@featherstats/database/types";
import { UpdateUserPreferencesSchema } from "lib/validation/user";
import { z } from "zod";

export type UserProfile = Omit<User, 'metadata'>
export type UpdateUserPreferencesOptions = z.infer<typeof UpdateUserPreferencesSchema>