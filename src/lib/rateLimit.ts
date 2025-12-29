// Simple in-memory rate limiter for form submissions
const submissions = new Map<string, number[]>();

const RATE_LIMIT = {
    maxSubmissions: 3, // Maximum submissions
    windowMs: 60 * 60 * 1000, // 1 hour window
};

export function checkRateLimit(identifier: string): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const userSubmissions = submissions.get(identifier) || [];

    // Remove old submissions outside the time window
    const recentSubmissions = userSubmissions.filter(
        timestamp => now - timestamp < RATE_LIMIT.windowMs
    );

    if (recentSubmissions.length >= RATE_LIMIT.maxSubmissions) {
        return { allowed: false, remaining: 0 };
    }

    // Add current submission
    recentSubmissions.push(now);
    submissions.set(identifier, recentSubmissions);

    return {
        allowed: true,
        remaining: RATE_LIMIT.maxSubmissions - recentSubmissions.length
    };
}

export function getClientIdentifier(request: Request): string {
    // Get IP from various headers (Vercel, Cloudflare, etc.)
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const cfConnectingIp = request.headers.get('cf-connecting-ip');

    const ip = forwarded?.split(',')[0] || realIp || cfConnectingIp || 'unknown';
    return ip;
}
