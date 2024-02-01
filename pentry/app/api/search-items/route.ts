import {auth} from "@/auth";
import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
    const apiUrl =/* process.env.SQL_DATABASE || */'http://localhost:8080';
    const query = request.nextUrl.searchParams.get('query');
    const page = request.nextUrl.searchParams.get('page');
    console.log('query', query)
    console.log('page', page)
    const session = await auth()
    const res = await fetch(`${apiUrl}/api/v2/search/paginated/parameter/${query}?page=${page}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.token}`
            , cache: "no-store",
        },
    })
    //const data = await res.json()

    return Response.json(res)
}