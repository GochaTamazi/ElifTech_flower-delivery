import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import apiService from "./api/apiService";
import { Flower, Shop, CartItem, OrderForm, ShopResponse } from './types';
import ShopPage from './components/Shop';
import CartPage from './components/Cart';

const App: React.FC = () => {
    // State
    const [activeTab, setActiveTab] = useState<'shop' | 'cart'>('shop');
    const [selectedShop, setSelectedShop] = useState<number>(1);
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

    const handleSubmitOrder = useCallback(() => {
        // Prepare the order data in the required JSON format
        const orderData = {
            email: orderForm.email,
            phone: orderForm.phone,
            deliveryAddress: orderForm.address,
            deliveryLat: 50.4501, // Default coordinates for Kiev
            deliveryLng: 30.5234, // Default coordinates for Kiev
            shopId: selectedShop,
            items: cartItems.map(item => ({
                FlowerId: item.Id,
                Quantity: item.quantity
            })),
            couponCode: '', // You can add coupon functionality later
            userTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };

        // Show the order data in alert
        alert(JSON.stringify(orderData, null, 2));
        
        // Log to console for debugging
        console.log('Order data:', orderData);
        
        // Here you would typically send the order to your backend
        // For now, we'll just show the alert with the order data
        
        // Commented out the clearing of cart and form since we're just previewing for now
        /*
        setCartItems([]);
        setOrderForm({
            name: '',
            email: '',
            phone: '',
            address: ''
        });
        
        setActiveTab('shop');
        */
    }, [orderForm, cartItems, selectedShop]);

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
                    <button className="sort-btn">Sort by price</button>
                    <button className="sort-btn">Sort by date</button>
                </div>
            </header>

            {activeTab === 'shop' ? (
                <ShopPage 
                    shops={shops}
                    selectedShop={selectedShop}
                    flowers={flowers}
                    isLoading={isLoading}
                    onSelectShop={setSelectedShop}
                    onAddToCart={addToCart}
                />
            ) : (
                <CartPage
                    cartItems={cartItems}
                    orderForm={orderForm}
                    onUpdateQuantity={updateQuantity}
                    onRemoveFromCart={removeFromCart}
                    onOrderFormChange={handleOrderFormChange}
                    onSubmitOrder={handleSubmitOrder}
                />
            )}
        </div>
    );
};

export default App;