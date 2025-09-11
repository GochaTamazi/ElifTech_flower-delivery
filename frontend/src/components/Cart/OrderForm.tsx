import React from 'react';
/*import { OrderForm } from '../../types';

interface OrderFormProps {
    formData: OrderForm;
    onChange: (field: keyof OrderForm, value: string) => void;
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
        <form className="order-form" onSubmit={handleSubmit}>
            <h2>Order Details</h2>
            <div className="form-group">
                <label>Name:</label>
                <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => onChange('name', e.target.value)}
                    required 
                />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => onChange('email', e.target.value)}
                    required 
                />
            </div>
            <div className="form-group">
                <label>Phone:</label>
                <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => onChange('phone', e.target.value)}
                    required 
                />
            </div>
            <div className="form-group">
                <label>Address:</label>
                <textarea 
                    value={formData.address}
                    onChange={(e) => onChange('address', e.target.value)}
                    required 
                />
            </div>
            <button 
                type="submit" 
                className="submit-order-btn"
                disabled={isSubmitDisabled}
            >
                Submit Order
            </button>
        </form>
    );
};

export default OrderFormComponent;
*/