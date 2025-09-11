import React from 'react';
import { Flower } from '../../types';
import ProductCard from './ProductCard';

interface ProductListProps {
    flowers: Flower[];
    isLoading: boolean;
    onAddToCart: (flower: Flower) => void;
}

const ProductList: React.FC<ProductListProps> = ({ flowers, isLoading, onAddToCart }) => {
    if (isLoading) {
        return <div className="loading">Loading flowers...</div>;
    }

    if (flowers.length === 0) {
        return <div className="no-flowers">No flowers available in this shop</div>;
    }

    return (
        <div className="products-grid">
            {flowers.map(flower => (
                <ProductCard 
                    key={flower.Id} 
                    flower={flower} 
                    onAddToCart={onAddToCart} 
                />
            ))}
        </div>
    );
};

export default ProductList;
