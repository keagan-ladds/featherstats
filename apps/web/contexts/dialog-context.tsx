import { createContext } from "react";

export type AppDialog = 'preferences' | 'subscription'

interface DialogContext {
    dialog: AppDialog | undefined
    setDialog: (dialog: AppDialog | undefined) => void;
}

export const DialogContext = createContext<DialogContext | null>(null);