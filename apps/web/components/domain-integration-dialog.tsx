import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@repo/ui/components/ui/dialog";
import TrackingSnippet from "./tracking-snippet";

export default function DomainIntegrationDialog() {
    return <>
        <Dialog>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Integrate</DialogTitle>
                    <DialogDescription>
                        How to add acdsc sdcisdc iuiuiusdc
                    </DialogDescription>
                </DialogHeader>
                <TrackingSnippet />
            </DialogContent>
        </Dialog>
    </>
}