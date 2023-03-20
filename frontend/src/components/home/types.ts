export interface Product {
    document_id: string;
    title: string;
    thumbnail: string;
    signature_count: number;
}

export interface ProductLists {
    ProductList1 : Product[],
    ProductList2 : Product[]
}

export interface genProductListProps {
    ProductList: ProductLists | null;
    setProductLists: React.Dispatch<React.SetStateAction<ProductLists | null>>;
}