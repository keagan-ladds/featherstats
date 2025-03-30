'use client'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@repo/ui/components/ui/dialog";
import useDialog from "hooks/use-dialog";
import SubscriptionPlanSelection from "components/subscription/subscription-plan-selection";

export default function UserPlanSelectionDialog() {
    const { close, isOpen } = useDialog("upgrade")

    return <>
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="md:!max-w-[825px]">
                <DialogHeader>
                    <DialogTitle>Choose Your Plan</DialogTitle>
                    <DialogDescription>
                        Select the plan that best fits your needs.
                    </DialogDescription>
                </DialogHeader>
                <SubscriptionPlanSelection />
            </DialogContent>
        </Dialog>
    </>
}