import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest, context: { params: Promise<{ source: string }> }): Promise<any> {
    const [source] = (await context.params).source;
    if (!source) return new NextResponse();

    const sourceIcon = knowSourceIcons[source.toLowerCase()] || `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${source}&size=32`;
    return await fetchExternalImage(sourceIcon)
}


async function fetchExternalImage(href: string) {
    try {
        const imageResponse = await fetch(href);
        if (imageResponse.ok) {
            const contentType = imageResponse.headers.get("content-type");
            const body = imageResponse.body;

            let response = new NextResponse(body, { status: 200 })
            response.headers.set("content-type", contentType!);
            response.headers.set('cache-control', 'public, max-age=2629800');
            return response;
        }
    } catch (err) {

    }

    const fallbackIconPath = path.join(process.cwd(), 'public', 'icons', 'source', 'fallback.png');
    const fallbackIconContent = fs.readFileSync(fallbackIconPath);


    return new NextResponse(fallbackIconContent, {
        headers: {
            'content-type': 'image/png',
            'cache-control': 'public, max-age=2629800',
        }
    })
}

const knowSourceIcons: Record<string, string> = {
    "google": "https://google.com/favicon.ico",
    "instagram": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://instagram.com&size=32",
    "bing": "https://www.bing.com/favicon.ico",
    "facebook": "https://www.facebook.com/favicon.ico",
    "linkedin": "https://www.linkedin.com/favicon.ico"
};