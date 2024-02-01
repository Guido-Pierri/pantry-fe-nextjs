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
                try {
                    console.log('inside sign in')
                    await signIn(provider)
                } catch (e: any) {
                    console.log('e', e)
                    if (e.message === 'NEXT_REDIRECT') {
                        console.log('e.message', e.message)
                        redirect('/signup')
                    }
                }

                /*
            if (provider === 'google') {
                console.log('inside google sign in')
                const session = await auth()*/
                /*if (session?.user) {

                    const dbUSer = await getUser(session.user.email)
                    if (dbUSer === undefined) {
                        redirect('http://localhost3000/signup')
                    }
                }
            }*/
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