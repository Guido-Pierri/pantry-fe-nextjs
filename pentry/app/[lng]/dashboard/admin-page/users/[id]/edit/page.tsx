import {fetchUserById} from "@/app/lib/data";
import Form from "@/app/ui/admin-page/users/edit-form";
import Box from "@mui/material/Box";


export default async function Page({params}: { params: { id: string } }) {
    const id = params.id;
    const user = await fetchUserById(id);

    return (
        <Box>
            <Form user={user}/>
        </Box>
    );
}