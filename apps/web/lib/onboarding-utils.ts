"use server"
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

interface FlowParams {
    plan?: string;
    period?: string;
    currency?: string;
    promo?: string;
}

export async function setFlowCookies(params: FlowParams) {

    const cookieStore = await cookies()
    const opts = {
        maxAge: 60 * 60,
        sameSite: 'strict',
    } satisfies Partial<ResponseCookie>

    params.plan && cookieStore.set('pL', params.plan, opts);
    params.period && cookieStore.set('pD', params.period, opts);
    params.currency && cookieStore.set('cY', params.currency, opts);
    params.promo && cookieStore.set('prM', params.promo, opts)
}

export async function getFlowCookies(): Promise<FlowParams> {
    const cookieStore = await cookies();
    return {
        plan: cookieStore.get('pL')?.value,
        period: cookieStore.get('pD')?.value,
        currency: cookieStore.get('cY')?.value,
        promo: cookieStore.get('prM')?.value
    }
}
