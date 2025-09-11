import React, { useState, useEffect } from 'react';
import './OrderDetails.css';

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
        return new Date(dateString).toLocaleString();
    };

    if (isLoading) {
        return (
            <div className="order-details">
                <div className="loading">Loading order details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="order-details">
                <div className="error-message">{error}</div>
                <button 
                    className="back-to-shop"
                    onClick={onBackToShop}
                >
                    Back to Shop
                </button>
            </div>
        );
    }

    return (
        <div className="order-details">
            <h2>Order Details</h2>
            
            {order ? (
                <div className="order-info">
                    <div className="order-header">
                        <p><strong>Order #:</strong> {order.Id}</p>
                        <p><strong>Shop ID:</strong> {order.ShopId}</p>
                        <p><strong>Order Date:</strong> {order.CreatedAt ? formatDate(order.CreatedAt) : 'N/A'}</p>
                        <p><strong>Timezone:</strong> {order.UserTimezone}</p>
                    </div>

                    <div className="customer-info">
                        <h3>Customer Information</h3>
                        <p><strong>Email:</strong> {order.Email}</p>
                        <p><strong>Phone:</strong> {order.Phone}</p>
                        <p><strong>Delivery Address:</strong> {order.DeliveryAddress}</p>
                        <p><strong>Location:</strong> {order.DeliveryLatitude}, {order.DeliveryLongitude}</p>
                        {order.CouponCode && <p><strong>Coupon Code:</strong> {order.CouponCode}</p>}
                    </div>

                    <div className="order-items">
                        <h3>Order Items</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items && order.items.length > 0 ? (
                                    order.items.map((item) => (
                                        <tr key={item.Id}>
                                            <td>Flower #{item.FlowerId}</td>
                                            <td>{item.Quantity}</td>
                                            <td>N/A</td>
                                            <td>N/A</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="no-items">No items in this order</td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={3} className="total-label">Total:</td>
                                    <td className="total-amount">${order.TotalPrice ? order.TotalPrice.toFixed(2) : '0.00'}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div className="order-actions">
                        <button 
                            className="back-to-shop"
                            onClick={onBackToShop}
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            ) : (
                <div className="no-order">
                    <p>No order details available.</p>
                    <button 
                        className="back-to-shop"
                        onClick={onBackToShop}
                    >
                        Back to Shop
                    </button>
                </div>
            )}
        </div>
    );
};

export default OrderDetails;
