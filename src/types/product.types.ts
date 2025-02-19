export interface Product {
    _id: string,
    name: string,
    brand: string,
    description: string,
    price: number,
    units: number
}

export interface ManageProductsProps {
    products: Product[];
    fetchProducts: () => void;
}