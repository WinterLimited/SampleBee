type Page = {
    name: string;
    link: string;
}

const pages: Page[] = [
    {
        name: 'Products',
        link: '/products',
    },
    {
        name: 'Partner Company',
        link: '/partner-company',
    },
    {
        name: 'Brands',
        link: '/brands',
    },
    {
        name: 'Ask Us',
        link: '/ask-us',
    },
];

export type { Page }
export { pages }