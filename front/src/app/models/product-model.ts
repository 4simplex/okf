export class Product {
    _id: string;
    category: { _id: string, name: string };
    brand: { _id: string, name: string };
    name: string;
    description: string;
    photo: string;
    fileImg: string;
    user: string;
    createdDate: Date;
}
