import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { unstable_cache } from 'next/cache';

const getScript = unstable_cache(
  async () => {
    // Read the minified analytics script
    const scriptPath = path.join(process.cwd(), 'public', 'js', 'featherstats.min.js');
    return await fs.promises.readFile(scriptPath, 'utf-8');
  },
  ['script'],
  { revalidate: 36000 }
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get('key');

  if (!apiKey) {
    return new NextResponse('API key is required', { status: 400 });
  }

  const scriptContent = await getScript();

  // Inject the API key into the script
  const scriptWithKey = `window.FEATHERSTATS_API_KEY = "${apiKey}";${scriptContent}`;

  return new NextResponse(scriptWithKey, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
    },
  });
}
