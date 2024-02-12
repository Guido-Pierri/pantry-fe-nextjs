import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import {fetchAllUsers, fetchUserByEmail, fetchUserById} from "@/app/lib/data";
import Form from "@/app/ui/admin-page/users/edit-form";


export default async function Page({params}: { params: { id: string } }) {
    const id = params.id;
    const user = await fetchUserById(id);

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {label: 'Users', href: '/dashboard/admin-page'},
                    {
                        label: 'Edit User',
                        href: `/dashboard/admin-page/users/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form user={user}/>
        </main>
    );
}