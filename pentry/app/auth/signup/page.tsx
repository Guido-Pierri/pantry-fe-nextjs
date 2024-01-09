import Link from "next/link";
import SignupForm from "@/app/ui/signup-form";

const SignupPage = () => {
    return (
        <div className={'grid grid-cols-1 md:grid-cols-2 justify-center items-center '}>
            <div className={'md:col-span-2'}>

                <p className={'text-center p-2 flex justify-center items-center'}>Already Signed up?</p>
                <Link href={'/auth/signin'}>
                    Sign In
                </Link>
            </div>
            <SignupForm/>
        </div>
    );
}
export default SignupPage;