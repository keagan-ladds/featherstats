'use client'
import { Button } from "@repo/ui/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function TrackingSnippet() {

    const [copied, setCopied] = useState(false);

    const snippet = `<!-- Add the widget script with your API key -->
<script src="${process.env.NEXT_PUBLIC_WIDGET_URL || 'http://localhost:3000'}/widget.js?apiKey=${"sssssss"}"></script>`;

    const handleCopy = () => {
        navigator.clipboard.writeText(snippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return <>
        <div className="relative w-full">
            <pre className="p-4 rounded-lg bg-muted font-mono text-sm">
                {snippet}
            </pre>
            <Button
                size="icon"
                variant="ghost"
                className="absolute top-4 right-4 h-6 w-6"
                onClick={handleCopy}
            >
                {copied ? (
                    <Check className="h-4 w-4" />
                ) : (
                    <Copy className="h-4 w-4" />
                )}
            </Button>
        </div>
    </>
}