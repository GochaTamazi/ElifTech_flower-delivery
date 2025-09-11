export interface Flower {
    Id: number;
    ShopId: number;
    Name: string;
    Description: string;
    Price: number;
    DateAdded: string;
    ImageUrl: string;
}

export interface Shop {
    Id: number;
    Name: string;
}

export interface CartItem extends Omit<Flower, 'ShopId' | 'DateAdded'> {
    quantity: number;
}

export interface OrderForm {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface ShopResponse {
    Id: number;
    Name: string;
    Address: string;
    Latitude: number;
    Longitude: number;
    flowers: Flower[];
}
