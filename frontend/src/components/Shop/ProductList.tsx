import React, { useState, useMemo } from 'react';
import { Flower } from '../../types';
import ProductCard from './ProductCard';
import styles from './ProductList.module.css';

interface ProductListProps {
    flowers: Flower[];
    isLoading: boolean;
    sortBy: 'price' | 'date' | null;
    sortOrder: 'asc' | 'desc';
    onAddToCart: (flower: Flower) => void;
}

const ProductList: React.FC<ProductListProps> = ({ 
    flowers, 
    isLoading, 
    sortBy, 
    sortOrder, 
    onAddToCart 
}) => {
    const sortedFlowers = useMemo(() => {
        const flowersToSort = [...flowers];
        
        if (!sortBy) return flowersToSort;
        
        return flowersToSort.sort((a, b) => {
            let comparison = 0;
            
            switch (sortBy) {
                case 'price':
                    comparison = a.Price - b.Price;
                    break;
                case 'date':
                    comparison = new Date(a.DateAdded).getTime() - new Date(b.DateAdded).getTime();
                    break;
            }
            
            return sortOrder === 'asc' ? comparison : -comparison;
        });
    }, [flowers, sortBy, sortOrder]);

    if (isLoading) {
        return <div className={styles.loading}>Loading flowers...</div>;
    }

    if (flowers.length === 0) {
        return <div className={styles.noFlowers}>No flowers available in this shop</div>;
    }

    return (
        <div className={styles.container}>

            <div className={styles.productsGrid}>
                {sortedFlowers.map((flower: Flower) => (
                    <ProductCard 
                        key={flower.Id} 
                        flower={flower} 
                        onAddToCart={onAddToCart} 
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
