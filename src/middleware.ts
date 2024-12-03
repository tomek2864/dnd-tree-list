import { NextRequest, NextResponse, userAgent } from 'next/server';

export const config = {
    matcher: [
        "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
    ],
};

export function middleware(request: NextRequest) {
    const { os } = userAgent(request);
    const isIOS = os.name === 'ios';

    if (!isIOS) {
        return NextResponse.next();
    }

    if (request.nextUrl.searchParams.has('ios')) {
        return NextResponse.next();
    }

    request.nextUrl.searchParams.set('ios', 'true');

    return NextResponse.redirect(request.nextUrl);
}
