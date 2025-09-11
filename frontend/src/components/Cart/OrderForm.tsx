import React from 'react';
import { OrderForm as OrderFormType } from '../../types';
import './OrderForm.css';

interface OrderFormProps {
    formData: OrderFormType;
    onChange: (field: keyof OrderFormType, value: string) => void;
    onSubmit: () => void;
    isSubmitDisabled: boolean;
}

const OrderForm: React.FC<OrderFormProps> = ({
    formData,
    onChange,
    onSubmit,
    isSubmitDisabled
}) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSubmitDisabled) {
            onSubmit();
        }
    };

    return (
        <div className="order-form-container">
            <form className="order-form" onSubmit={handleSubmit}>
                <h2>Order Details</h2>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input 
                        id="name"
                        type="text" 
                        value={formData.name}
                        onChange={(e) => onChange('name', e.target.value)}
                        required 
                        placeholder="Enter your full name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        id="email"
                        type="email" 
                        value={formData.email}
                        onChange={(e) => onChange('email', e.target.value)}
                        required
                        placeholder="your.email@example.com"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input 
                        id="phone"
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => onChange('phone', e.target.value)}
                        required
                        placeholder="+1 (___) ___-____"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Delivery Address:</label>
                    <textarea 
                        id="address"
                        value={formData.address}
                        onChange={(e) => onChange('address', e.target.value)}
                        required
                        placeholder="Enter full delivery address"
                    />
                </div>

            </form>
        </div>
    );
};

export default OrderForm;
