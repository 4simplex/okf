export class Price {
    _id: string;
    productForm: {
        product: {
            _id: string;
            category: {
                _id: string,
                name: string
            };
            brand: {
                _id: string,
                name: string
            };
            name: string;
            description: string;
            photo: string;
            fileImg: string;
        }
    };
    provider: {
        _id: string,
        name: string
    };
    purchasePrice: number;
    salePrice: number;
    productCode: string;
    stock: number;
    units: number;
    priceForUnits: number;
    user: string;
    createdDate: Date;
}
