import React from 'react';
import { Flower } from '../../types';
import ProductCard from './ProductCard';
import styles from './ProductList.module.css';

interface ProductListProps {
    flowers: Flower[];
    isLoading: boolean;
    onAddToCart: (flower: Flower) => void;
}

const ProductList: React.FC<ProductListProps> = ({ flowers, isLoading, onAddToCart }) => {
    if (isLoading) {
        return <div className={styles.loading}>Loading flowers...</div>;
    }

    if (flowers.length === 0) {
        return <div className={styles.noFlowers}>No flowers available in this shop</div>;
    }

    return (
        <div className={styles.productsGrid}>
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
