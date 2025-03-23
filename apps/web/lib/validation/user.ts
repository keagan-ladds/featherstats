import { z } from "zod";

export const UpdateUserPreferencesSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    clarityModeEnabled: z.boolean(),
    theme: z.enum(['dark', 'light', 'system'])

})