import {signIn, signOut} from "@/auth"
import {Button} from "@/app/ui/button"
import {AuthError} from "next-auth";
import {redirect} from "next/navigation";

export function SignIn({
                           provider,
                       }: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
    return (
        <form
            action={async () => {
                "use server"
                await signIn(provider)
            }}
        >
            <Button>Sign In</Button>
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