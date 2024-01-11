'use client';
import {useFormState} from "react-dom";
import {registerUser} from "@/app/lib/actions";

export default function SignUpForm() {
    const [dispatch] = useFormState(registerUser, undefined);

    return (
        <form action={dispatch} className={'flex flex-col'}>
            <label htmlFor={"firstName"}>First name</label>
            <input id={"firstName"} name={"firstName"} type={"text"} required={true}/>
            <label htmlFor={"lastName"}>Last name</label>
            <input id={"lastName"} name={"lastName"} type={"text"} required={true}/>
            <label htmlFor={"email"}>Email</label>
            <input id={"email"} name={"email"} type={"email"} required={true}/>
            <label htmlFor={"password"}>Password</label>
            <input id={"password"} name={"password"} type={"password"} required={true}/>
            <label htmlFor={"confirmPassword"}>Confirm password</label>
            <input id={"confirmPassword"} name={"confirmPassword"} type={"password"} required={true}/>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type={"submit"}>
                Sign up
            </button>
        </form>
    );
}