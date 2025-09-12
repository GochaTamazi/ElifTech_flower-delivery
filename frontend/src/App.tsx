import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import apiService from "./api/apiService";
import { Flower, Shop, CartItem, OrderForm, ShopResponse } from './types';
import ShopPage from './components/Shop';
import CartPage from './components/Cart';
import OrderDetails from './components/OrderDetails';

type SortBy = 'price' | 'date' | null;
type SortOrder = 'asc' | 'desc';

const App: React.FC = () => {
    // State
    const [activeTab, setActiveTab] = useState<'shop' | 'cart' | 'order-details'>('shop');
    const [currentOrderId, setCurrentOrderId] = useState<string>('');
    const [selectedShop, setSelectedShop] = useState<number>(1);
    const [sortBy, setSortBy] = useState<SortBy>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [shops, setShops] = useState<Shop[]>([]);
    const [flowers, setFlowers] = useState<Flower[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [orderForm, setOrderForm] = useState<OrderForm>({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    // Helper function to validate if an object matches the Flower interface
    const isValidFlower = (data: any): data is Flower => {
        return (
            data &&
            typeof data.Id === 'number' &&
            typeof data.ShopId === 'number' &&
            typeof data.Name === 'string' &&
            typeof data.Description === 'string' &&
            typeof data.Price === 'number' &&
            typeof data.DateAdded === 'string' &&
            typeof data.ImageUrl === 'string'
        );
    };

    // Cart functions
    const addToCart = useCallback((flower: Flower) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.Id === flower.Id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.Id === flower.Id 
                        ? { ...item, quantity: item.quantity + 1 } 
                        : item
                );
            }
            return [...prevItems, { ...flower, quantity: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((flowerId: number) => {
        setCartItems(prevItems => 
            prevItems.filter(item => item.Id !== flowerId)
        );
    }, []);

    const updateQuantity = useCallback((flowerId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.Id === flowerId 
                    ? { ...item, quantity: newQuantity } 
                    : item
            )
        );
    }, []);

    const handleOrderFormChange = useCallback((field: keyof OrderForm, value: string) => {
        setOrderForm(prev => ({
            ...prev,
            [field]: value
        }));
    }, []);

    const handleOrderSuccess = useCallback((orderId: string) => {
        console.log('handleOrderSuccess called with orderId:', orderId);
        // Clear cart and form after successful order
        setCartItems([]);
        setOrderForm({
            name: '',
            email: '',
            phone: '',
            address: ''
        });
        
        // Set the current order ID and navigate to order details
        console.log('Setting currentOrderId to:', orderId);
        setCurrentOrderId(orderId);
        console.log('Setting activeTab to order-details');
        setActiveTab('order-details');
    }, []);

    const getShops = async () => {
        const response = await apiService.get<Shop[]>('/shops');
        if (response.data) {
            setShops(response.data);
        }
    };

    const fetchFlowers = async (shopId: number) => {
        try {
            setIsLoading(true);
            const response = await apiService.get<ShopResponse>(`/shops/${shopId}`);

            if (!response?.data) {
                setFlowers([]);
                console.warn('No data received from API');
                return;
            }

            const shopData = response.data;
            if (Array.isArray(shopData.flowers)) {
                const validFlowers = shopData.flowers.filter(flower => isValidFlower(flower));
                if (validFlowers.length !== shopData.flowers.length) {
                    console.warn('Some flower data is invalid and was filtered out');
                }
                setFlowers(validFlowers);
            } else {
                console.warn('No valid flowers array found in the response');
                setFlowers([]);
            }
        } catch (error) {
            console.error('Error fetching flowers:', error);
            setFlowers([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Load shops and flowers when component mounts or selectedShop changes
    useEffect(() => {
        getShops();
        if (selectedShop) {
            fetchFlowers(selectedShop);
        }
    }, [selectedShop]);

    return (
        <div className="app">
            <header className="header">
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'shop' ? 'active' : ''}`}
                        onClick={() => setActiveTab('shop')}
                    >
                        Shop
                    </button>
                    <button
                        className={`tab ${activeTab === 'cart' ? 'active' : ''}`}
                        onClick={() => setActiveTab('cart')}
                    >
                        Shopping Cart {cartItems.length > 0 && `(${cartItems.length})`}
                    </button>
                </div>

                <div className="sort-options">
                    <button 
                        className={`sort-btn ${sortBy === 'price' ? 'active' : ''}`}
                        onClick={() => {
                            if (sortBy === 'price') {
                                setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
                            } else {
                                setSortBy('price');
                                setSortOrder('asc');
                            }
                        }}
                    >
                        Sort by price {sortBy === 'price' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                    </button>
                    <button 
                        className={`sort-btn ${sortBy === 'date' ? 'active' : ''}`}
                        onClick={() => {
                            if (sortBy === 'date') {
                                setSortOrder((prev: SortOrder) => prev === 'asc' ? 'desc' : 'asc');
                            } else {
                                setSortBy('date');
                                setSortOrder('asc');
                            }
                        }}
                    >
                        Sort by date {sortBy === 'date' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                    </button>
                </div>
            </header>

            {activeTab === 'shop' ? (
                <ShopPage 
                    shops={shops}
                    selectedShop={selectedShop}
                    flowers={flowers}
                    isLoading={isLoading}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSelectShop={setSelectedShop}
                    onAddToCart={addToCart}
                />
            ) : (
                activeTab === 'cart' && (
                    <CartPage
                        cartItems={cartItems}
                        orderForm={orderForm}
                        selectedShop={selectedShop}
                        onUpdateQuantity={updateQuantity}
                        onRemoveFromCart={removeFromCart}
                        onOrderFormChange={handleOrderFormChange}
                        onOrderSuccess={handleOrderSuccess}
                    />
                )
            )}
            {activeTab === 'order-details' && (
                <>
                    {console.log('Rendering OrderDetails:', { activeTab, currentOrderId })}
                    {currentOrderId ? (
                        <OrderDetails 
                            orderId={currentOrderId} 
                            onBackToShop={() => setActiveTab('shop')} 
                        />
                    ) : (
                        <div className="order-details">
                            <h2>No Order Found</h2>
                            <p>We couldn't find your order details. Please try again or contact support.</p>
                            <button 
                                className="back-to-shop"
                                onClick={() => setActiveTab('shop')}
                            >
                                Back to Shop
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default App;