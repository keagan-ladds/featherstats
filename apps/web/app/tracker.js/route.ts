import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// This will be unique per build
const BUILD_ID = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
    process.env.VERCEL_GIT_COMMIT_SHA ||
    Date.now().toString()

// Pre-load the file at build time
const filePath = path.join(process.cwd(), 'public', 'js', 'featherstats.min.js')
const TRACKER_JS_TEMPLATE = fs.readFileSync(filePath, 'utf8')

export async function GET(request: Request) {
    try {
        // Get query parameters
        const { searchParams } = new URL(request.url)
        const trackingId = searchParams.get('key') || 'DEFAULT_ID'

        if (!trackingId) return new NextResponse('Tracking key not provided.', {
            status: 400,
            headers: {
                'Content-Type': 'application/javascript; charset=utf-8',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            }
        })

        // Create a unique ETag for this specific request
        const requestSpecificETag = `"${BUILD_ID}-${trackingId}"`
        const trackerSpecificJs = `window.FEATHERSTATS_API_KEY = "${trackingId}";${TRACKER_JS_TEMPLATE}`;
        // Return the customized file content with appropriate headers
        return new NextResponse(trackerSpecificJs, {
            headers: {
                'Content-Type': 'application/javascript; charset=utf-8',
                'Cache-Control': 'public, max-age=7200, s-maxage=7200', // 2 hours
                'ETag': requestSpecificETag,
                'X-Content-Type-Options': 'nosniff'
            }
        })
    } catch (error) {
        console.error('Error serving tracker.js:', error)
        return new NextResponse('Error serving tracker.js', {
            status: 500,
            headers: {
                'Content-Type': 'application/javascript; charset=utf-8',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            }
        })
    }
}