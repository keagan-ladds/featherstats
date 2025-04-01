'use client'
import { AppDialog, DialogContext } from "contexts/dialog-context";
import { useCallback, useContext, useMemo } from "react";

export default function useDialog(dialog: AppDialog) {
    const context = useContext(DialogContext);
    if (!context) throw new Error("The hook 'useDialog' can only be used within an DialogProvider context.")


    const open = useCallback((data?: any) => {
        context.setDialog(dialog)
        context.setData(data || undefined);
    }, [])

    const close = useCallback((open?: boolean | undefined) => {
        if (open === undefined || !open)
            context.setDialog(undefined)
        else
            context.setDialog(dialog);

    }, [])

    const isOpen = useMemo(() => {
        return context.dialog === dialog
    }, [context])

    return {
        open,
        close,
        isOpen,
        data: context.data
    }
}