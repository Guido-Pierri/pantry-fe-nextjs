import {Checkbox} from "@nextui-org/checkbox";
import Link from "next/link";
import {Button} from "@nextui-org/button";

const SignupForm = () => {
    return (
        <div>
            <form className={'grid grid-cols-2 gap-3 p-2 shadow border rounded-md'}>
                <label
                    htmlFor="firstName"
                >
                    First Name
                </label>
                <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    required
                />
                <label
                    htmlFor="lastName"
                >
                    Last Name
                </label>
                <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    required
                />
                <label
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Enter your email address"
                    required
                />
                <label
                    htmlFor="password"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                />
                <Checkbox>I accept the <Link href={'/terms'}>Terms</Link></Checkbox>
                <Button color={'primary'} type={'submit'}>Submit</Button>
            </form>
        </div>
    );
}
export default SignupForm;