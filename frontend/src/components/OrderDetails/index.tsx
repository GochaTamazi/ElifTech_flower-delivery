import React, { useState, useEffect } from 'react';
import './OrderDetails.css';
import backIcon from '../../assets/back-arrow.svg'; // Make sure to add a back arrow icon

interface OrderItem {
    Id: number;
    OrderId: string;
    FlowerId: number;
    Quantity: number;
    FlowerName?: string;
    Price?: number; // This will be populated later if needed
}

interface OrderDetailsType {
    Id: string;
    Email: string;
    Phone: string;
    DeliveryAddress: string;
    DeliveryLatitude: number;
    DeliveryLongitude: number;
    ShopId: number;
    CouponCode: string | null;
    TotalPrice: number;
    CreatedAt: string;
    UserTimezone: string;
    items: OrderItem[];
}

interface ApiResponse {
    success: boolean;
    data: OrderDetailsType;
}

interface OrderDetailsProps {
    orderId: string;
    onBackToShop: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId, onBackToShop }) => {
    const [order, setOrder] = useState<OrderDetailsType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!orderId) {
                setError('No order ID provided');
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);
                
                // Fetch order details from the API
                const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
                }
                
                const responseData: ApiResponse = await response.json();
                
                if (responseData.success && responseData.data) {
                    // The API returns items in the 'items' property, so we don't need to transform it
                    setOrder(responseData.data);
                } else {
                    setError('No order data received');
                }
            } catch (err) {
                console.error('Error fetching order details:', err);
                setError('Failed to load order details. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        } catch (e) {
            console.error('Error formatting date:', e);
            return dateString;
        }
    };

    const handleBack = () => {
        onBackToShop();
    };

    if (isLoading) {
        return (
            <div className="order-details-container">
                <div className="order-loading">Loading order details...</div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="order-details-container">
                <div className="order-error">
                    <p>Unable to load order details.</p>
                    <button className="back-to-shop" onClick={handleBack}>
                        <img src={backIcon} alt="Back" /> Back to Shop
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="order-details">
            <h1>Order Details</h1>
            <p className="order-number">#{order.Id.substring(0, 8).toUpperCase()}</p>
            
            <div className="order-items">
                <h2>Your Order</h2>
                <div className="items-list">
                    {order.items && order.items.length > 0 ? (
                        order.items.map((item) => (
                            <div key={item.Id} className="order-item">
                                <div className="item-image">
                                    <div className="image-placeholder">🌹</div>
                                </div>
                                <div className="item-name">Flower #{item.FlowerId}</div>
                                <div className="item-quantity">x{item.Quantity}</div>
                            </div>
                        ))
                    ) : (
                        <div className="no-items">No items in this order</div>
                    )}
                </div>
                
                <div className="order-total">
                    <span>Total:</span>
                    <span className="total-amount">${order.TotalPrice ? order.TotalPrice.toFixed(2) : '0.00'}</span>
                </div>
            </div>
            
            <div className="order-info">
                <h3>Delivery Address:</h3>
                <p>{order.DeliveryAddress || 'No address provided'}</p>
                
                <h3>Date:</h3>
                <p>{order.CreatedAt ? formatDate(order.CreatedAt) : 'N/A'}</p>
            </div>
        </div>
    );
};

export default OrderDetails;
