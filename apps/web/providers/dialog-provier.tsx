'use client'
import { AppDialog, DialogContext } from "contexts/dialog-context";
import { useState } from "react";

interface Props {
    children: React.ReactNode
}

export default function DialogProvider({ children }: Props) {
    const [dialog, setDialog] = useState<AppDialog | undefined>();
    const [data, setData] = useState<any | undefined>();

    return <DialogContext.Provider value={{ dialog, data, setDialog, setData }}>
        {children}
    </DialogContext.Provider>
}