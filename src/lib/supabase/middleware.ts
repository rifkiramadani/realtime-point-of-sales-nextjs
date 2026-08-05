import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { environtment } from "@/configs/environment";

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } = environtment;

    const supabase = createServerClient(
        SUPABASE_URL!,
        SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options),
                    )
                }
            }
        }
    );

    //ambil data user
    const {
        data: { user },
    } = await supabase.auth.getUser();

    //jika user belum login dan sedang di halaman selain login maka arahkan ke halaman login
    if (!user && request.nextUrl.pathname !== '/login') {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    //jika user sudah login dan sedang di halaman login maka arahkan ke halaman /
    if (user && request.nextUrl.pathname === '/login') {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    return supabaseResponse;
}