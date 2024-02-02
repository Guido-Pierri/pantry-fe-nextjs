import {auth, getUser, signIn, signOut} from "@/auth"
import {Button} from "@/app/ui/button"
import {redirect} from "next/navigation";

export function SignIn({
                           provider,
                       }: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
    return (
        <form
            action={async () => {
                "use server"


                /* if (provider === 'google') {
                     try {
                         console.log('inside sign in')*/
                await signIn(provider);
                /*

                                    } catch (e: any) {
                                        console.log('e.message', e.message)
                                        if (e) {
                                            redirect('/signup')
                                        }
                                    }
                                }
                                        */
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