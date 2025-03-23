import { UserContext } from "contexts/user-context";
import { updateUserProfile } from "lib/client/api-client";
import { useCallback, useContext, useState } from "react";
import { UpdateUserPreferencesOptions } from "types/user";
import { toast } from "sonner"

export function useUser() {
    const context = useContext(UserContext);
    if (!context) throw new Error("The 'useUser' hook should only be used within an UserProvider context");

    const [loading, setLoading] = useState<boolean>(false)
    const openPreferences = useCallback((open?: boolean) => {
        context.setPreferencesOpen(open == undefined ? true : open);
    }, [])

    const updateUserPreferences = useCallback(async (opts: UpdateUserPreferencesOptions) => {
        setLoading(true);
        try {
            await updateUserProfile(opts);
            context.setPreferencesOpen(false);
            context.setProfile({
                ...context.profile,
                name: opts.name,
                preferences: {
                    ...context.profile.preferences,
                    clarifyModeEnabled: opts.clarityModeEnabled,
                    theme: opts.theme
                }
            })
            toast("Your preferences were updated successfully")
        } catch (err) {
            toast.error("An unexpected error occurred while updating your preferences, please refresh the page and try again.")
        }

        setLoading(false);
    }, [])

    return {
        loading,
        profile: context.profile,
        preferencesOpen: context.preferencesOpen,
        openPreferences,
        updateUserPreferences
    }
}