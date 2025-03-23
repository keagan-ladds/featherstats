import { createContext } from "react";
import { UserProfile } from "types/user";

interface UserContext {
    profile: UserProfile
    preferencesOpen: boolean;
    setPreferencesOpen: (open: boolean) => void;
    setProfile: (profile: UserProfile) => void;
}

export const UserContext = createContext<UserContext | null>(null)
