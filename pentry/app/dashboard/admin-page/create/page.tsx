import Form from '@/app/ui/admin-page/users/create-form';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import {fetchAllRoles, fetchAllUsers} from '@/app/lib/data';

export default async function Page() {
    const users = await fetchAllUsers();
    const roles = await fetchAllRoles();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {label: 'Admin page', href: '/dashboard/admin-page'},
                    {
                        label: 'Create User',
                        href: '/dashboard/admin-page/create',
                        active: true,
                    },
                ]}
            />
            <Form users={users} roles={roles}/>
        </main>
    );
}