"use client"

import { useState } from "react"
import { Check, Code, Copy, ExternalLink, FileCode, Globe, Info, ShoppingBag } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@repo/ui/components/ui/dialog"
import { cn, getURL } from "lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Button } from "@repo/ui/components/ui/button"
import { Alert, AlertDescription } from "@repo/ui/components/ui/alert"
import { ScrollArea } from "@repo/ui/components/ui/scroll-area"
import useDialog from "hooks/use-dialog"


interface IntegrationDialogProps {
    trackingId?: string
}

export default function AnalyticsIntegrationDialog({ trackingId = "ABC-123456" }: IntegrationDialogProps) {
    const { isOpen, close } = useDialog("dialog_integrate")
    const [copied, setCopied] = useState<string | null>(null)

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
        <div className="flex items-center justify-center p-4">
            <Dialog open={isOpen} onOpenChange={close}>
                <DialogContent className="md:max-w-[900px] max-h-[85vh]">
                    <DialogHeader>
                        <DialogTitle>Integrate Analytics Tracking</DialogTitle>
                        <DialogDescription>
                            Add our analytics tracking code to your website to start collecting visitor data.
                        </DialogDescription>
                    </DialogHeader>


                    <ScrollArea className={cn("flex flex-col flex-1 overflow-y-auto pr-1 max-h-[65vh]")}>
                        <Tabs defaultValue="javascript" className="flex flex-col mt-4">
                            <TabsList className="grid grid-cols-4">
                                <TabsTrigger value="javascript" className="flex items-center gap-1.5 !w-full">
                                    <Code className="h-4 w-4" />
                                    <span>JavaScript</span>
                                </TabsTrigger>
                                <TabsTrigger value="wordpress" className="flex items-center gap-1.5 !w-full">
                                    <FileCode className="h-4 w-4" />
                                    <span>WordPress</span>
                                </TabsTrigger>
                                <TabsTrigger value="shopify" className="flex items-center gap-1.5 !w-full">
                                    <ShoppingBag className="h-4 w-4" />
                                    <span>Shopify</span>
                                </TabsTrigger>
                                <TabsTrigger value="other" className="flex items-center gap-1.5 !w-full">
                                    <Globe className="h-4 w-4" />
                                    <span>Other</span>
                                </TabsTrigger>
                            </TabsList>

                            {/* JavaScript Integration */}
                            <TabsContent value="javascript" className="mt-4 space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Add JavaScript Tracking Code</CardTitle>
                                        <CardDescription>
                                            Add this code to your website's HTML, just before the closing &lt;/head&gt; tag.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
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

                                        <Alert className="mt-4">
                                            <Info className="h-4 w-4" />
                                            <AlertDescription>
                                                Your tracking ID (<code className="bg-muted px-1  rounded text-sm">{trackingId}</code>) is
                                                already included in the code snippet above.
                                            </AlertDescription>
                                        </Alert>
                                    </CardContent>
                                    <CardFooter className="flex flex-col items-start">
                                        <h4 className="font-medium mb-2">Implementation Tips:</h4>
                                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                            <li>Place the code just before the closing &lt;/head&gt; tag for optimal performance</li>
                                            <li>The script loads asynchronously and won't affect your page load speed</li>
                                            <li>Verify installation by checking for network requests to our analytics domain</li>
                                        </ul>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            {/* WordPress Integration */}
                            <TabsContent value="wordpress" className="mt-4 space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>WordPress Integration</CardTitle>
                                        <CardDescription>
                                            Add analytics tracking to your WordPress site using one of these methods.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
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
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="gap-1.5" asChild>
                                            <a href="#" target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-4 w-4" />
                                                WordPress Integration Guide
                                            </a>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            {/* Shopify Integration */}
                            <TabsContent value="shopify" className="mt-4 space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Shopify Integration</CardTitle>
                                        <CardDescription>Add analytics tracking to your Shopify store.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
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

                                        <Alert>
                                            <Info className="size-4" />
                                            <AlertDescription>
                                                After adding the code, make sure to save your changes and test your tracking on your live store.
                                            </AlertDescription>
                                        </Alert>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="gap-1.5" asChild>
                                            <a href="#" target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-4 w-4" />
                                                Shopify Integration Guide
                                            </a>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            {/* Other Platforms */}
                            <TabsContent value="other" className="mt-4 space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Other Platforms</CardTitle>
                                        <CardDescription>Integration instructions for other popular platforms.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
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
                                    </CardContent>
                                    <CardFooter className="flex justify-between gap-2">
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
                                        <Button variant="outline" className="gap-1.5" asChild>
                                            <a href="#" target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-4 w-4" />
                                                Integration Documentation
                                            </a>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </ScrollArea>

                </DialogContent>
            </Dialog>
        </div>
    )
}

