import {
    BanknotesIcon,
    ClockIcon,
    UserGroupIcon,
    InboxIcon,
    ListBulletIcon, MagnifyingGlassIcon, ClipboardDocumentListIcon, ShoppingCartIcon
} from '@heroicons/react/24/outline';
import {lusitana} from '@/app/ui/fonts';
import Link from "next/link";
import {Item, SearchItem} from "@/app/lib/definitions";
import Image from "next/image";

const iconMap = {
    /*collected: BanknotesIcon,
    customers: UserGroupIcon,
    pending: ClockIcon,*/
    items: ShoppingCartIcon,
    search: MagnifyingGlassIcon,
    recipes: ClipboardDocumentListIcon
};

export default async function CardWrapper() {
    return (
        <>
            {/* NOTE: comment in this code when you get to this point in the course */}

            {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      /> */}
        </>
    );
}

export function Card({
                         title,
                         value,
                         type,
                         item,
                     }: {
    title: string;
    value: number | string;
    type: 'items' | 'search' | 'recipes'/*  | 'collected'*/;
    item?: Item;
}) {
    const Icon = iconMap[type];

    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
                {Icon ? <Icon className="h-5 w-5 text-gray-700"/> : null}
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <div className="flex flex-col items-center justify-items-center px-4">
                {item?.image ? <Image src={item?.image as string} width={300} height={300} alt=""/> : null}

                <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
                    {value}
                </p>
            </div>
        </div>
    );
}

export function ItemCard({
                             title,
                             subtitle,
                             value,
                             type,
                             item,
                         }: {
    title: string;
    subtitle?: string;
    image?: string;
    value: number | string;
    item: SearchItem;
    type: 'items' | 'search';
}) {
    const Icon = iconMap[type];

    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div>
                <h1>{item.Varumarke}</h1>
            </div>
            <Link href={`/dashboard/pantry/items/${item.GTIN}`} key={item.GTIN}>
                <h2>{item.Artikelbenamning}</h2>
            </Link>
        </div>
    );
}