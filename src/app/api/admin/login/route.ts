import { NextResponse } from 'next/server';

// Simple authentication - in production, use proper auth like NextAuth
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'Forare2025!';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}
