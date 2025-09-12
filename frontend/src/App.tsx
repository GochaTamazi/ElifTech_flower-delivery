import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import apiService from "./api/apiService";
import {Flower, Shop, CartItem, OrderForm, ShopResponse} from './types';
import ShopPage from './components/Shop';
import CartPage from './components/Cart';
import OrderDetails from './components/OrderDetails';
import {useSession} from './hooks/useSession';

type SortBy = 'price' | 'date' | null;
type SortOrder = 'asc' | 'desc';

declare global {
    interface Window {
        crypto: Crypto & {
            randomUUID: () => string;
        };
    }
}

const App: React.FC = () => {
    // Session management
    const {userId, isLoading: isSessionLoading} = useSession();

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
        address: '',
        DeliveryDateTime: new Date().toISOString()
    });

    // Load cart from localStorage when userId changes
    useEffect(() => {
        if (userId) {
            const savedCart = localStorage.getItem(`cart_${userId}`);
            if (savedCart) {
                try {
                    const parsedCart = JSON.parse(savedCart);
                    setCartItems(parsedCart);
                } catch (error) {
                    console.error('Error parsing saved cart:', error);
                    setCartItems([]);
                }
            } else {
                setCartItems([]);
            }
        } else {
            setCartItems([]);
        }
    }, [userId]);

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
        if (!userId) return; // Don't add to cart if no user session

        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.Id === flower.Id);
            const updatedItems = existingItem
                ? prevItems.map(item =>
                    item.Id === flower.Id
                        ? {...item, quantity: item.quantity + 1}
                        : item
                )
                : [...prevItems, {...flower, quantity: 1, userId}];

            // Save to localStorage
            localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedItems));

            return updatedItems;
        });
    }, [userId]);

    const removeFromCart = useCallback((flowerId: number) => {
        if (!userId) return;

        setCartItems(prevItems => {
            const updatedItems = prevItems.filter(item => item.Id !== flowerId);
            localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedItems));
            return updatedItems;
        });
    }, [userId]);

    const updateQuantity = useCallback((flowerId: number, newQuantity: number) => {
        if (newQuantity < 1 || !userId) return;

        setCartItems(prevItems => {
            const updatedItems = prevItems.map(item =>
                item.Id === flowerId ? {...item, quantity: newQuantity} : item
            );
            localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedItems));
            return updatedItems;
        });
    }, [userId]);

    const handleOrderFormChange = useCallback((field: keyof OrderForm, value: string) => {
        setOrderForm(prev => ({
            ...prev,
            [field]: value
        }));
    }, []);

    const handleOrderSuccess = useCallback((orderId: string) => {
        console.log('handleOrderSuccess called with orderId:', orderId);

        // Clear cart from state
        setCartItems([]);

        // Clear cart from localStorage if user is logged in
        if (userId) {
            localStorage.removeItem(`cart_${userId}`);
        }

        // Reset order form
        setOrderForm({
            name: '',
            email: '',
            phone: '',
            address: '',
            DeliveryDateTime: new Date().toISOString()
        });

        // Set the current order ID and navigate to order details
        console.log('Setting currentOrderId to:', orderId);
        setCurrentOrderId(orderId);
        console.log('Setting activeTab to order-details');
        setActiveTab('order-details');
    }, [userId]);

    const getShops = async () => {
        const response = await apiService.get<Shop[]>('/shops');
        if (response.data) {
            setShops(response.data);
        }
    };

    const fetchFlowers = async (shopId: number) => {
        try {
            setIsLoading(true);

            // Convert sortBy to match backend field names if needed
            const sortField = sortBy === 'price' ? 'Price' : 'DateAdded';
            const sortDir = sortOrder.toUpperCase();
            const page = 1;
            const pageSize = 50; // Increased page size to show more items

            const response = await apiService.get<ShopResponse>(
                `/flowers/shop/${shopId}?sortBy=${sortField}&sortOrder=${sortDir}&page=${page}&pageSize=${pageSize}`
            );

            if (!response?.data) {
                setFlowers([]);
                console.warn('No data received from API');
                return;
            }

            console.log('Fetched flowers:', response.data);

            const shopData = response.data;
            if (Array.isArray(shopData)) {
                const validFlowers = shopData.filter(flower => isValidFlower(flower));
                if (validFlowers.length !== shopData.length) {
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

    useEffect(() => {
        // Only load data if we have a valid session
        if (!isSessionLoading && userId) {
            getShops();
            if (selectedShop) {
                fetchFlowers(selectedShop);
            }
        }
    }, [selectedShop, isSessionLoading, userId]);

    // Show loading while session is being initialized
    if (isSessionLoading) {
        return <div className="loading">Initializing session...</div>;
    }

    // Check if we have a valid user ID
    if (!userId) {
        return (
            <div className="error">
                Error: Could not initialize user session. Please refresh the page.
            </div>
        );
    }

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

                {activeTab === 'shop' && (
                    <div className="sort-options">
                        <button
                            className={`sort-btn ${sortBy === 'price' ? 'active' : ''}`}
                            onClick={() => {
                                const newSortBy = 'price';
                                const newSortOrder = sortBy === 'price'
                                    ? (sortOrder === 'asc' ? 'desc' : 'asc')
                                    : 'asc';

                                setSortBy(newSortBy);
                                setSortOrder(newSortOrder);

                                // Trigger data refetch with new sort parameters
                                if (selectedShop) {
                                    fetchFlowers(selectedShop);
                                }
                            }}
                        >
                            Sort by price {sortBy === 'price' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </button>
                        <button
                            className={`sort-btn ${sortBy === 'date' ? 'active' : ''}`}
                            onClick={() => {
                                const newSortBy = 'date';
                                const newSortOrder = sortBy === 'date'
                                    ? (sortOrder === 'asc' ? 'desc' : 'asc')
                                    : 'asc';

                                setSortBy(newSortBy);
                                setSortOrder(newSortOrder);

                                // Trigger data refetch with new sort parameters
                                if (selectedShop) {
                                    fetchFlowers(selectedShop);
                                }
                            }}
                        >
                            Sort by date {sortBy === 'date' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </button>
                    </div>
                )}
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
                    {console.log('Rendering OrderDetails:', {activeTab, currentOrderId})}
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