'use client';
import {useFormState, useFormStatus} from "react-dom";
import {registerUser} from "@/app/lib/actions";
import {useState} from "react";
import {InputType} from "node:zlib";
import {ExclamationCircleIcon, EyeIcon, EyeSlashIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {Button} from "@/app/ui/button";
import {ArrowRightIcon} from "@heroicons/react/20/solid";
import {auth} from "@/auth";
import {useSession} from "next-auth/react";

export default async function SignUpForm() {

// Store the token in a state
    const [errorMessage, dispatch] = useFormState(registerUser, undefined);
    const [isVisiblePass, setIsVisiblePass] = useState(false);
    const toggleVisblePass = () => {
        setIsVisiblePass((prev) => !prev)
    };
    return (
        <form action={dispatch} className={'flex flex-col'}>
            <label htmlFor={"firstName"}>First name</label>
            <input id={"firstName"} name={"firstName"} type={"text"} required={true}/>
            <label htmlFor={"lastName"}>Last name</label>
            <input id={"lastName"} name={"lastName"} type={"text"} required={true}/>
            <label htmlFor={"email"}>Email</label>
            <input id={"email"} name={"email"} type={"email"} required={true}/>
            <label htmlFor={"password"}>Password</label>
            <div className="relative flex flex-1">
                <input id={"password"} name={"password"} type={isVisiblePass ? "text" : "password"}
                       required={true}></input>
                {isVisiblePass ? (<EyeSlashIcon
                    className="absolute right-3/4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 cursor-pointer"
                    //className="w-4 cursor-pointer"
                    onClick={toggleVisblePass}/>) : <EyeIcon onClick={toggleVisblePass}
                                                             className="absolute right-3/4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 cursor-pointer"
                />}
            </div>
            <label htmlFor={"confirmPassword"}>Confirm password</label>
            <div className="relative flex flex-1">

                <input id={"confirmPassword"} name={"confirmPassword"} type={isVisiblePass ? "text" : "password"}
                       required={true}></input>
                {isVisiblePass ? (<EyeSlashIcon
                    className="absolute right-3/4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 cursor-pointer"
                    //className="w-4 cursor-pointer"
                    onClick={toggleVisblePass}/>) : <EyeIcon onClick={toggleVisblePass}
                                                             className="absolute right-3/4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 cursor-pointer"/>}
            </div>
            <SignupButton/>
            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {errorMessage && (
                    <>
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500"/>
                        {/*<p className="text-sm text-red-500">{errorMessage}</p>*/}
                    </>
                )}
            </div>
        </form>
    );
}

function SignupButton() {
    const {pending} = useFormStatus();

    return (
        <Button className="mt-4 w-full" aria-disabled={pending}>
            Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50"/>
        </Button>
    );
}