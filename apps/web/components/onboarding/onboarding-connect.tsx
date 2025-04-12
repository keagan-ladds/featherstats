'use client'

import { Check, Copy, Plug } from "lucide-react"
import { OnboardingContinueButton } from "./onboarding-form"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@repo/ui/components/ui/accordion"
import { useCallback, useState } from "react"
import { getURL } from "lib/utils"
import { Button } from "@repo/ui/components/ui/button"
import { useOnboarding } from "hooks/use-onboarding"
export default function OnboardingStepConnect() {

    const [copied, setCopied] = useState<string | null>(null)
    const { onContinue, validateTag, trackingId, error } = useOnboarding()

    const jsSnippet = `<!-- Analytics Tracking Code -->
<script src="${getURL("/tracker.js")}?key=${trackingId}"></script>`

    const wordpressSnippet = `<?php
// Add this code to your theme's functions.php file
function add_analytics_tracking_code() {
?>
  <!-- Analytics Tracking Code -->
  <script src="${getURL("/tracker.js")}?key=${trackingId}"></script>
<?php
}
add_action('wp_head', 'add_analytics_tracking_code');
?>`

    const copyToClipboard = async (text: string, type: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(type)
            setTimeout(() => setCopied(null), 2000)
        } catch (err) {
            console.error("Failed to copy: ", err)
        }
    }



    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col">
                <div className="flex h-10 w-10 justify-center rounded-md mb-2">
                    <Plug className="size-10" />
                </div>
                <h1 className="text-xl font-bold">Connect Your Domain</h1>
                <div className="text-muted-foreground text-sm">
                    Add the tracking token and you're ready to go
                </div>
            </div>
            <div className='flex flex-col gap-4 w-full'>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="javascript">
                        <AccordionTrigger>JavaScript</AccordionTrigger>
                        <AccordionContent>
                            <div>Add this code to your website's HTML, just before the closing &lt;/head&gt; tag.</div>
                            <div className="relative">
                                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                                    <code>{jsSnippet}</code>
                                </pre>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="absolute top-2 right-2"
                                    onClick={() => copyToClipboard(jsSnippet, "js")}
                                >
                                    {copied === "js" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="wordpress">
                        <AccordionTrigger>WordPress</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                            <div className="text-semibold">Add analytics tracking to your WordPress site using one of these methods.</div>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-medium mb-2">Method 1: Using a Plugin</h3>
                                    <ol className="list-decimal list-inside space-y-2 text-sm">
                                        <li>Install and activate the "Header and Footer Scripts" plugin</li>
                                        <li>Go to Settings → Header and Footer Scripts</li>
                                        <li>Paste the following code in the "Scripts in Header" section:</li>
                                    </ol>

                                    <div className="relative mt-3">
                                        <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                                            <code>{jsSnippet}</code>
                                        </pre>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="absolute top-2 right-2"
                                            onClick={() => copyToClipboard(jsSnippet, "wp-plugin")}
                                        >
                                            {copied === "wp-plugin" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-2">Method 2: Using functions.php</h3>
                                    <ol className="list-decimal list-inside space-y-2 text-sm">
                                        <li>Access your theme's functions.php file via FTP or the WordPress theme editor</li>
                                        <li>Add the following code at the end of the file:</li>
                                    </ol>

                                    <div className="relative mt-3">
                                        <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                                            <code>{wordpressSnippet}</code>
                                        </pre>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="absolute top-2 right-2"
                                            onClick={() => copyToClipboard(wordpressSnippet, "wp-functions")}
                                        >
                                            {copied === "wp-functions" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="shopify">
                        <AccordionTrigger>Shopify</AccordionTrigger>
                        <AccordionContent>
                            <div>Add analytics tracking to your Shopify store.</div>
                            <div className="space-y-4">
                                <ol className="list-decimal list-inside space-y-3 text-sm">
                                    <li>Log in to your Shopify admin panel</li>
                                    <li>Go to Online Store → Themes</li>
                                    <li>Find your current theme and click "Actions" → "Edit code"</li>
                                    <li>In the Layout folder, click on "theme.liquid"</li>
                                    <li>
                                        Find the <code className="bg-muted px-1 py-0.5 rounded">&lt;/head&gt;</code> tag
                                    </li>
                                    <li>
                                        Paste the following code just before the{" "}
                                        <code className="bg-muted px-1 py-0.5 rounded">&lt;/head&gt;</code> tag:
                                    </li>
                                </ol>

                                <div className="relative">
                                    <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                                        <code>{jsSnippet}</code>
                                    </pre>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="absolute top-2 right-2"
                                        onClick={() => copyToClipboard(jsSnippet, "shopify")}
                                    >
                                        {copied === "shopify" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                </div>

                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="other">
                        <AccordionTrigger>Other</AccordionTrigger>
                        <AccordionContent>
                            <div>Integration instructions for other popular platforms.</div>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-2">Wix</h3>
                                    <ol className="list-decimal list-inside space-y-2 text-sm">
                                        <li>Log in to your Wix account and go to your site's dashboard</li>
                                        <li>Click on "Settings" in the left sidebar</li>
                                        <li>Select "Custom Code" from the menu</li>
                                        <li>Click "Add Custom Code"</li>
                                        <li>Give your code a name (e.g., "Analytics Tracking")</li>
                                        <li>Paste the tracking code in the code box</li>
                                        <li>Set placement to "Head" and "All pages"</li>
                                        <li>Click "Apply" to save your changes</li>
                                    </ol>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-2">Squarespace</h3>
                                    <ol className="list-decimal list-inside space-y-2 text-sm">
                                        <li>Log in to your Squarespace account</li>
                                        <li>Go to Settings → Advanced → Code Injection</li>
                                        <li>Paste the tracking code into the "Header" field</li>
                                        <li>Click "Save" to apply your changes</li>
                                    </ol>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-2">Google Tag Manager</h3>
                                    <ol className="list-decimal list-inside space-y-2 text-sm">
                                        <li>Log in to your Google Tag Manager account</li>
                                        <li>Select your container</li>
                                        <li>Click "Tags" → "New"</li>
                                        <li>Name your tag (e.g., "Analytics Tracking")</li>
                                        <li>Click "Tag Configuration" → "Custom HTML"</li>
                                        <li>Paste the tracking code</li>
                                        <li>Click "Triggering" and select "All Pages"</li>
                                        <li>Save the tag and publish your container</li>
                                    </ol>
                                </div>

                                <Button variant="outline" className="gap-1.5" onClick={() => copyToClipboard(jsSnippet, "other")}>
                                    {copied === "other" ? (
                                        <>
                                            <Check className="h-4 w-4" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-4 w-4" />
                                            Copy Tracking Code
                                        </>
                                    )}
                                </Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <OnboardingContinueButton text="I've add the tracker to my domain" onClick={validateTag} />
                {error && <span className="text-destructive font-semibold text-sm text-balance">{error}</span>}
                <div className="cursor-pointer">
                    <span onClick={() => onContinue("done")} className="flex items-center justify-center text-primary font-bold text-sm hover:underline">Skip
                    </span>
                </div>
            </div>
        </div >
    )
}