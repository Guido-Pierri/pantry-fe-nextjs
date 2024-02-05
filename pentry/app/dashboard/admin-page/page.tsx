import {auth} from "@/auth";
import {fetchAllUsers} from "@/app/lib/data";
import {Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode} from "react";

export default async function Page() {
    const session = await auth();
    const user = session?.dbUser;
    const allUsers = await fetchAllUsers();

    const deleteUser = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        deleteUser(event)
    };

    return (
        <>
            <div className={'text-3xl'}>Admin Page</div>
            <div>
                Users: {allUsers ? allUsers.length : 0}
            </div>
            <div className={'grid grid-cols-3 border-2 font-extrabold'}>
                <div className={''}>Id</div>
                <div>Name</div>
                <div>Modify</div>
            </div>
            {allUsers ? (allUsers.map((user: {
                id: Key | null | undefined;
                firstName: string | undefined;
                lastName: string | undefined;
            }) => {
                return (
                    <div className={'grid grid-cols-3 border-2 items-center'} key={user.id}>
                        <div>{user?.id as number}</div>
                        <div className={'cursor-pointer'}>
                            {user?.firstName} {user?.lastName}
                        </div>
                        <div className={'flex justify-end'}>
                            <button className={'bg-blue-500 text-white p-2 rounded-md'}>Edit</button>
                            <button className={'bg-red-500 text-white p-2 rounded-md ml-2'}
                            >Delete
                            </button>
                        </div>
                    </div>
                );
            })) : <div>loading...</div>}
        </>
    );
}
