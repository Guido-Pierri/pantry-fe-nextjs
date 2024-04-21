/*
import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
*/

import {croissant} from "@/app/ui/fonts";
import LoginForm from "@/app/ui/login-form";
import {SignIn} from "@/app/ui/auth/auth-components";
import {auth} from "@/auth";
import Link from "next/link";

export default async function LoginPage() {
    const session = await auth()
    if (!session?.user) return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
                    <h1 className={`${croissant.className} w-32 text-white md:w-36`}>
                        Pantry Partner
                    </h1>
                </div>
                Don&apos;t have an account? <Link className={`${croissant.className} text-blue-500 font-extrabold`} href="/signup">Sign
                up</Link>
                <LoginForm/>
                <SignIn provider={'google'} data={'Log in with Google'}></SignIn>
            </div>
        </main>
    );
}
