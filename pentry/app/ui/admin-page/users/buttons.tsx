import {deleteUser} from '@/app/lib/actions';
import {PencilIcon, TrashIcon} from "@heroicons/react/16/solid";
import Link from "@mui/material/Link";

// ...

export function UpdateUser({id}: { id: string }) {
    return (
        <Link
            href={`/dashboard/admin-page/users/${id}/edit`}
            className="rounded-md border p-2 hover:bg-gray-100"
        >
            <PencilIcon className="w-5"/>
        </Link>
    );
}

export function DeleteUser({id}: { id: string }) {
    const deleteUserWithId = deleteUser.bind(null, id);

    return (
        <form action={deleteUserWithId}>
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-4"/>
            </button>
        </form>
    );
}

