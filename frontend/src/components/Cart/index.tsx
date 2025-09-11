import React from 'react';

import { CartItem as CartItemType, OrderForm as OrderFormType } from '../../types';
import './Cart.css';
import CartItem from './CartItem';
import OrderFormComponent from './OrderForm';

interface CartProps {
    cartItems: CartItemType[];
    orderForm: OrderFormType;
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemoveFromCart: (id: number) => void;
    onOrderFormChange: (field: keyof OrderFormType, value: string) => void;
    onSubmitOrder: () => void;
}

const Cart: React.FC<CartProps> = ({
    cartItems,
    orderForm,
    onUpdateQuantity,
    onRemoveFromCart,
    onOrderFormChange,
    onSubmitOrder
}) => {
    const getTotalPrice = () => {
        return cartItems.reduce(
            (total, item) => total + (item.Price * item.quantity),
            0
        ).toFixed(2);
    };

    return (
        <div className="cart-page">
            <div className="cart-items">
                <h2>Your Order</h2>
                {cartItems.length > 0 ? (
                    <div className="cart-items-list">
                        {cartItems.map(item => (
                            <CartItem
                                key={item.Id}
                                item={item}
                                onUpdateQuantity={onUpdateQuantity}
                                onRemove={onRemoveFromCart}
                            />
                        ))}
                        <div className="cart-total">
                            <h3>Total: ${getTotalPrice()}</h3>
                        </div>
                    </div>
                ) : (
                    <p className="empty-cart">Your cart is empty</p>
                )}
            </div>

            <OrderFormComponent
                formData={orderForm}
                onChange={onOrderFormChange}
                onSubmit={onSubmitOrder}
                isSubmitDisabled={cartItems.length === 0}
            />
        </div>
    );
};

export default Cart;
