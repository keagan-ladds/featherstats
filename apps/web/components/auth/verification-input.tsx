'use client'

import { cn } from "lib/utils"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@repo/ui/components/ui/input-otp";
import { Loader } from "lucide-react";
import { useState } from "react";

interface Props {
    className?: string;
    error?: string
    infoText?: string;
    loading?: boolean
    onComplete: (token: string) => void;
}

export default function VerificationInput({ className, error, infoText, loading, onComplete }: Props) {

    const [token, setToken] = useState<string>();
    return <>
        <div className={cn("grid gap-6", className)}>
            <div className="flex flex-col items-center gap-2">
                <h1 className={cn("text-3xl font-bold", error && "animate-shake")}>Verification</h1>
                {infoText && <div className="text-center text-sm">
                    {infoText}
                </div>}
            </div>
            <div className="flex flex-col items-center gap-2">
                <InputOTP disabled={loading} maxLength={6} pattern={REGEXP_ONLY_DIGITS} value={token} onChange={setToken} onComplete={onComplete}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} className="h-16 w-12" />
                    </InputOTPGroup>
                    <InputOTPGroup>
                        <InputOTPSlot index={1} className="h-16 w-12" />
                    </InputOTPGroup>
                    <InputOTPGroup>
                        <InputOTPSlot index={2} className="h-16 w-12" />
                    </InputOTPGroup>
                    <InputOTPGroup>
                        <InputOTPSlot index={3} className="h-16 w-12" />
                    </InputOTPGroup>
                    <InputOTPGroup>
                        <InputOTPSlot index={4} className="h-16 w-12" />
                    </InputOTPGroup>
                    <InputOTPGroup>
                        <InputOTPSlot index={5} className="h-16 w-12" />
                    </InputOTPGroup>
                </InputOTP>

            </div>
            {loading && (<div className="flex flex-col items-center">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                </div>
            </div>)}

            {error && (<div className="flex flex-col items-center text-sm">
                <div className="flex items-center text-destructive text-center">
                    {error}
                </div>
            </div>)}
        </div></>
}