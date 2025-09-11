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
            <img 
                src={`/images/${item.ImageUrl}`} 
                alt={item.Name} 
                className="cart-item-image"
            />
            <div className="cart-item-details">
                <h3>{item.Name}</h3>
                <p>${item.Price} each</p>
                <div className="quantity-controls">
                    <button 
                        onClick={() => onUpdateQuantity(item.Id, item.quantity - 1)}
                        className="quantity-btn"
                    >
                        -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                        onClick={() => onUpdateQuantity(item.Id, item.quantity + 1)}
                        className="quantity-btn"
                    >
                        +
                    </button>
                </div>
                <button 
                    onClick={() => onRemove(item.Id)}
                    className="remove-btn"
                >
                    Remove
                </button>
            </div>
            <div className="cart-item-total">
                ${(item.Price * item.quantity).toFixed(2)}
            </div>
        </div>
    );
};

export default CartItem;
