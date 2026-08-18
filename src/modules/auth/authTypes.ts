export interface User {
    id: number;
    firstname: string;
    lastname: string | null;
    email: string;
    password: string;
    created_date: Date;
}