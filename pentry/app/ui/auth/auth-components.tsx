import {signIn, signOut} from "@/auth"
import {Button} from "@/app/ui/button"
import React from "react";


export function SignIn({
                           provider,data,
                       }:
                           { provider?: string,
                               data?:string }) {
    return (
        <form
            action={async () => {
                "use server"
                await signIn(provider)
            }}
        >
            <Button >{data}</Button>
        </form>
    )
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
            className="w-full"
        >
            <Button className="w-full p-0" {...props}>
                Sign Out
            </Button>
        </form>
    )
}
