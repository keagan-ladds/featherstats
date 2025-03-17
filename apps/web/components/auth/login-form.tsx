import { cn } from "lib/utils";
import { Button } from '@repo/ui/components/ui/button'
import { Label } from '@repo/ui/components/ui/label'
import { Input } from "@repo/ui/components/ui/input"
import Image from 'next/image'
import SocialLoginGoogle from "./login-social-google";
import SocialLoginGithub from "./login-social-github";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2">
                    <a
                        href="#"
                        className="flex flex-col items-center gap-2 font-medium"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-md">
                            <Image src="/featherstats.png" width={128} height={128} alt="featherstats" className="rounded-xs"></Image>
                        </div>
                        <span className="sr-only">Feather Stats.</span>
                    </a>
                    <h1 className="text-xl font-bold">Welcome to Featherstats</h1>
                    <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <a href="#" className="underline underline-offset-4">
                            Sign up
                        </a>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <SocialLoginGithub />
                    <SocialLoginGoogle />
                </div>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or
                    </span>
                </div>
                <div className="text-sm hover:underline">
                    <Link href="#" className="flex items-center justify-center text-primary font-bold ">Continue with Email
                        <ArrowRight className="inline ml-2 size-4" />
                    </Link>
                </div>
            </div>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}