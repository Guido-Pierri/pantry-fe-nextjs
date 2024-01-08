import {sql} from '@vercel/postgres';
import {Item, ItemForm, PantryDto, SearchItem, User,} from './definitions';

const apiUrl = process.env.SQL_DATABASE || 'http://localhost:8000';

//import { formatCurrency } from './utils';

/*export async function fetchRevenue() {
    // Add noStore() here prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).

    try {
        // Artificially delay a response for demo purposes.
        // Don't do this in production :)

        // console.log('Fetching revenue data...');
        // await new Promise((resolve) => setTimeout(resolve, 3000));

        const data = await sql<Revenue>`SELECT * FROM revenue`;

        // console.log('Data fetch completed after 3 seconds.');

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}*/

/*export async function fetchLatestInvoices() {
    try {
        const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

        const latestInvoices = data.rows.map((invoice) => ({
            ...invoice,
            amount: formatCurrency(invoice.amount),
        }));
        return latestInvoices;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest invoices.');
    }
}*/

/*export async function fetchLatestInvoices() {
    try {
        const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

        const latestInvoices = data.rows.map((invoice) => ({
            ...invoice,
            amount: formatCurrency(invoice.amount),
        }));
        return latestInvoices;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest invoices.');
    }
}*/

export async function fetchCardData() {
    try {
        // You can probably combine these into a single SQL query
        // However, we are intentionally splitting them to demonstrate
        // how to initialize multiple queries in parallel with JS.
        const itemCountPromise = sql`SELECT COUNT(*)
                                     FROM items`;
        //const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
        /*const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;*/

        const data = await Promise.all([
            itemCountPromise,
            //customerCountPromise,
            //invoiceStatusPromise,
        ]);

        const numberOfItems = Number(data[0].rows[0].count ?? '0');
        //const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
        //const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
        //const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');
        return {
            //numberOfCustomers,
            numberOfItems,
            /*totalPaidInvoices,
            totalPendingInvoices,*/
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}

export async function fetchPantry(): Promise<PantryDto> {

    const res: Response = await fetch(`${apiUrl}/api/v1/pantry/1`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    console.log('Response Status:', res.status);
    const data = await res.json();
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const id = data.id;
    const userId = data.userId;
    const items = data.items;
    return {id, userId, items}
}

export async function searchItems(query: string, currentPage: number): Promise<SearchItem[]> {
    console.log('inside searchItems');
    console.log('query', query);

    const res = await fetch(`http://localhost:8000/api/v2/search/parameter/${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    console.log('Response Status:', res.status);

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    console.log('API Response Data:', data);

    return data;
}

export async function fetchItemByGtin(gtin: string): Promise<Item> {
    console.log('inside fetchItemByGtin');
    const res = await fetch(`${apiUrl}/api/v2/search/product/${gtin}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }, cache: "no-store",

    });
    const data = await res.json();
    console.log('Response in fetchItemsByGtin:', data);
    return data;
}

export async function fetchPantryByUserId(user_id: string): Promise<PantryDto> {
    const res: Response = await fetch(`${apiUrl}/api/v1/pantry/user/${user_id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // Set the correct Content-Type header
            },
        });
    console.log('Response Status:', res.status);
    const data = await res.json();
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const id = data.id;
    const userId = data.userId;
    const items = data.items;
    return {id, userId, items}
}

export async function fetchUserByEmail(email: string): Promise<User> {
    const res: Response = await fetch(`${apiUrl}/api/v1/users/${email}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // Set the correct Content-Type header
            },
        });
    console.log('Response Status:', res.status);
    const data = await res.json();
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const id = data.id;
    const firstName = data.firstName;
    const lastName = data.lastName;
    const userEmail = data.email;
    return {id, firstName, lastName, email: userEmail, password: ''}
}


const ITEMS_PER_PAGE = 6;

/*export async function fetchFilteredInvoices(
    query: string,
    currentPage: number,
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

        return invoices.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoices.');
    }
}*/

export async function fetchInvoicesPages(query: string) {
    try {
        const count = await sql`SELECT COUNT(*)
                                FROM invoices
                                         JOIN customers ON invoices.customer_id = customers.id
                                WHERE customers.name ILIKE ${`%${query}%`}
                                   OR
                                    customers.email ILIKE ${`%${query}%`}
                                   OR
                                    invoices.amount::text ILIKE ${`%${query}%`}
                                   OR
                                    invoices.date::text ILIKE ${`%${query}%`}
                                   OR
                                    invoices.status ILIKE ${`%${query}%`}
        `;

        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of invoices.');
    }
}

export async function fetchItemById(id: string) {
    try {
        const data = await sql<ItemForm>`
            SELECT items.id,
                   items.customer_id,
                   items.amount,
                   items.status
            FROM items
            WHERE items.id = ${id};
        `;

        const item = data.rows.map((item) => ({
            ...item,
            // Convert amount from cents to dollars
            //amount: item.amount / 100,
        }));

        return item[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch items.');
    }
}

/*export async function fetchCustomers() {
    try {
        const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

        const customers = data.rows;
        return customers;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all customers.');
    }
}*/

/*export async function fetchFilteredCustomers(query: string) {
    try {
        const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

        const customers = data.rows.map((customer) => ({
            ...customer,
            total_pending: formatCurrency(customer.total_pending),
            total_paid: formatCurrency(customer.total_paid),
        }));

        return customers;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch customer table.');
    }
}
*/
/*
export async function getUser(email: string) {
    try {
        const user = await sql`SELECT *
                               FROM users
                               WHERE email = ${email}`;
        return user.rows[0] as User;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}*/
