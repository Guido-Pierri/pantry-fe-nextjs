// This file contains type definitions for your data.ts.
// It describes the shape of the data.ts, and what data.ts type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

declare module "next-auth" {
    interface Session {
        user: User;
        dbUser: User;
        token?: string;
        refreshToken?: string;
        provider?: string;
    }

}
declare module 'next-auth' {
    interface JWT {
        user: User;
    }
}
export type Pantry = {
    id: string;
    userId: string;
    items: Item[];

}
export type PantryDto = {
    id: number;
    userId: number;
    items: Item[];
}

export type Item = {
    id: string;
    name: string;
    quantity: number;
    expirationDate: string;
    gtin: string;
    brand: string;
    category: string;
    image: string;
    userId: string;

}
export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    accessToken?: string;
    token?: string;
};
export type ItemForm = {
    id: string;
    name: string;
    quantity: number;
    expirationDate: string;
    gtin: string;
    brand: string;
    category: string;
    image: string;
    userId: string;
}
export type SearchItem = {
    Forpackningsstorlek: string;
    Varumarke: string;
    GTIN: string;
    Artikelbenamning: string;
    TillverkarensArtikelnummer: string;
    Hyllkantstext: string;
    Artikeltyp: string;
    SkapadDatum: string;
    SenastAndradDatum: string;
};
//export type SearchDto = SearchItem[];
export type SearchPage = {
    content: SearchItem[];
    pageable: {
        pageNumber: number,
        pageSize: number,
        sort: { empty: boolean, sorted: boolean, unsorted: boolean },
        offset: number,
        paged: boolean,
        unpaged: boolean
    },
    last: boolean,
    totalPages: number,
    totalElements: number,
    size: number,
    number: number,
    sort: { empty: boolean, sorted: boolean, unsorted: boolean },
    numberOfElements: number,
    empty: boolean
}