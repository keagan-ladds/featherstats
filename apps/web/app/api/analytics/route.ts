import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { workspaceService } from 'services/workspace.service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get('key');

  if (!apiKey) {
    return new NextResponse('API key is required', { status: 400 });
  }

  const domain = await workspaceService.getWorkspaceDomainByKey(apiKey);
  if (!domain) return new NextResponse(null, { status: 401 });

  // Read the minified analytics script
  const scriptPath = path.join(process.cwd(), 'public', 'js', 'featherstats.min.js');
  const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

  // Inject the API key into the script
  const scriptWithKey = `window.FEATHERSTATS_API_KEY = "${apiKey}";${scriptContent}`;

  return new NextResponse(scriptWithKey, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, max-age=86400', // Cache for 1 day
    },
  });
}
