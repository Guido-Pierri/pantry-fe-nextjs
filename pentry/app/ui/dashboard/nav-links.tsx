'use client';

import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
    MagnifyingGlassIcon,
    CubeIcon, ClipboardIcon, RectangleStackIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import clsx from 'clsx';

// ...

export default function NavLinks() {
    const pathname = usePathname();
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
    const links = [
        {
            name: 'Home',
            href: '/dashboard',
            icon: HomeIcon
        },
        {
            name: 'Pantry',
            href: '/dashboard/pantry',
            icon: RectangleStackIcon,
        },
        {
            name: 'Search',
            href: '/dashboard/search',
            icon: MagnifyingGlassIcon
        },
        {
            name: 'Add Item',
            href: '/dashboard/add-item',
            icon: CubeIcon
        },
        {
            name: 'Recipes',
            href: '/dashboard/recipes',
            icon: ClipboardIcon
        },
    ];
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex flex-col  grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-sky-100 text-blue-600': pathname === link.href,
                            },
                        )}
                    >
                        <LinkIcon className="w-6"/>
                        <p className="">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}