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

export interface ProductListProps {
    products?: Product[];
    onDelete?: (_id:string) => void;
    onEdit?: (_id:string) => void;
}