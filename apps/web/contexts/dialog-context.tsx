import { createContext } from "react";

export type AppDialog = 'preferences' | 'subscription' | 'upgrade' | 'usage'

interface DialogContext {
    dialog: AppDialog | undefined
    setDialog: (dialog: AppDialog | undefined) => void;
}

export const DialogContext = createContext<DialogContext | null>(null);