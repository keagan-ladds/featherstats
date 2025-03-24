'use client'

import useAppShell from "hooks/use-app-shell"

export default function NavHeader() {
    const {headerContent} = useAppShell();
    return <>{headerContent()}</>
}