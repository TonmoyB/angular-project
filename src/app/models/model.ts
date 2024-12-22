export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    previousUrl?: string;
    type?: string
}

export interface User {
    name: string;
    username: string;
    password: string;
}