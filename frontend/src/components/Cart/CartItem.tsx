import React from 'react';
import { CartItem as CartItemType } from '../../types';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
    return (
        <div className="cart-item">
            <div className="cart-item-image">
                {item.ImageUrl ? (
                    <img 
                        src={`/images/${item.ImageUrl}`} 
                        alt={item.Name} 
                    />
                ) : (
                    <span>No image</span>
                )}
            </div>
            <div className="cart-item-details">
                <h4 className="cart-item-name">{item.Name}</h4>
                <p className="cart-item-price">${item.Price.toFixed(2)}</p>
            </div>
            <div className="cart-item-controls">
                <div className="quantity-controls">
                    <button 
                        onClick={() => onUpdateQuantity(item.Id, item.quantity - 1)}
                        className="quantity-btn"
                        aria-label="Decrease quantity"
                    >
                        -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                        onClick={() => onUpdateQuantity(item.Id, item.quantity + 1)}
                        className="quantity-btn"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>
                <div className="cart-item-total">
                    ${(item.Price * item.quantity).toFixed(2)}
                </div>
                <button 
                    onClick={() => onRemove(item.Id)}
                    className="remove-btn"
                    aria-label="Remove item"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default CartItem;
