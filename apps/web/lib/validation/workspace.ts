import { z } from "zod";

export const DomainCreateOptionsSchema = z.object({
    name: z.string().regex(new RegExp("^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$"), "Please provide a valid domain name"),
    enforce_origin_match: z.boolean(),
    normalize_www: z.boolean()
})