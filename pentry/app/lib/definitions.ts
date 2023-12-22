// This file contains type definitions for your data.ts.
// It describes the shape of the data.ts, and what data.ts type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
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
    name: string;
    email: string;
    password: string;
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