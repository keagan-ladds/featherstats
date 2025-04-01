'use client'
import { createContext } from "react";

export type AppDialog = 'preferences' | 'subscription' | 'upgrade' | 'usage' | 'checkout' | 'domain_create' | 'dialog_integrate'

interface DialogContext {
    dialog: AppDialog | undefined
    data: any | undefined;
    setDialog: (dialog: AppDialog | undefined) => void;
    setData: (data?: any | undefined) => void;
}

export const DialogContext = createContext<DialogContext | null>(null);