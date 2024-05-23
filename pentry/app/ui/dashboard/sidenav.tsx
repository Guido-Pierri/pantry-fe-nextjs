import {auth} from '@/auth';
import {croissant} from "@/app/ui/fonts";
import {User} from "@/app/lib/definitions";
import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import NavLinks from "@/app/ui/dashboard/nav-links";
import {fetchPantryByUserId} from "@/app/lib/data";

export default async function SideNav({searchParams}: {
    searchParams?: {
        query?: string;
        page?: string;
    }
}) {
    const session = await auth();
    const user = session?.user as User;
    const roles = user?.roles;
    const pantry = await fetchPantryByUserId(user?.id);
    if (!pantry) return null;
    if (!session?.token) return null;
    return (
        <Box>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}
                 sx={{
                     borderRadius: "1rem",
                     padding: 3,
                     margin: '1rem',
                     backgroundColor: 'primary.main',
                 }}>
                <Typography fontSize={32} color={'white'}
                            fontFamily={croissant.style.fontFamily}>
                    Pantry Partner
                </Typography>
            </Box>
            <Box>
                <NavLinks user={user} pantry={pantry} searchParams={searchParams} session={session}/>
            </Box>
            {/*
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                {session?.token ? (<form
                    action={async () => {
                        'use server';
                        await signOut();
                    }}
                >

                    <button
                        className="flex flex-col w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <PowerIcon className="w-6"/>
                        <div className="">Sign Out</div>
                    </button>
                </form>) : <form
                    action={async () => {
                        'use server';
                        await signOut();
                    }}
                >

                    <button
                        className="flex flex-col w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <ArrowRightEndOnRectangleIcon className="w-6"/>
                        <div className="">Sign In</div>
                    </button>
                </form>}
            </div>*/}
        </Box>
    );
}