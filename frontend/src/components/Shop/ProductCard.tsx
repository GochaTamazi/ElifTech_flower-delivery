import React from 'react';
import { Flower } from '../../types';
import './ProductCard.css';

interface ProductCardProps {
    flower: Flower;
    onAddToCart: (flower: Flower) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ flower, onAddToCart }) => {
    return (
        <div className="product-card">
            <div className="flower-image">
                <img
                    src={`/images/${flower.ImageUrl}`}
                    alt={flower.Name}
                />
                <button className="favorite-btn">❤</button>
            </div>
            <h3>{flower.Name}</h3>
            <p>${flower.Price}</p>
            <button 
                className="add-to-cart"
                onClick={() => onAddToCart(flower)}
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
