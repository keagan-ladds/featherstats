'use client'

import { UserContext } from "contexts/user-context"
import { useState } from "react"
import { UserProfile } from "types/user"

interface Props {
    children: React.ReactNode
    userProfile: UserProfile
}

export default function UserProvider({ userProfile, children }: Props) {
    const [profile, setProfile] = useState<UserProfile>(userProfile);
    const [preferencesOpen, setPreferencesOpen] = useState<boolean>(false);

    const context = {
        profile,
        preferencesOpen,
        setPreferencesOpen,
        setProfile
    }

    return <UserContext value={context}> {children}</UserContext>
}