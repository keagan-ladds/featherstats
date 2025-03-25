'use client'
import { AppDialog, DialogContext } from "contexts/dialog-context";
import { useState } from "react";

interface Props {
    children: React.ReactNode
}

export default function DialogProvider({ children }: Props) {
    const [dialog, setDialog] = useState<AppDialog | undefined>();

    return <DialogContext.Provider value={{ dialog, setDialog }}>
        {children}
    </DialogContext.Provider>
}