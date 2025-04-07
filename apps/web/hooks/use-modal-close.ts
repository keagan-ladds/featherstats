'use client'

import { useCallback, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export function useModalSafeClose(fallbackPath = '/', alwaysUseFallback = false) {
    const router = useRouter()
    const initialHistoryLength = useRef<number>(0)

    useEffect(() => {
        // Capture the browser's initial history length when the modal mounts
        initialHistoryLength.current = window.history.length
    }, [])

    const closeModal = useCallback(() => {
        // Check if we're navigating within the app (not a fresh tab or deep link)
        const isFreshTabOrLink = initialHistoryLength.current <= 1

        if (!isFreshTabOrLink && !alwaysUseFallback) {
            // Back within app if history length > 1
            router.back()
        } else {
            // Navigate to fallback path if it's a fresh tab or deep link
            router.replace(fallbackPath)
        }
    }, [router, fallbackPath, alwaysUseFallback])

    return closeModal
}