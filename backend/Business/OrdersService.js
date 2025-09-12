const {v4: uuidv4} = require('uuid');
const BaseService = require('./BaseService');

class OrdersService extends BaseService {
    constructor(orderRepo, orderItemsRepo, flowerRepo, couponRepo, shopRepo) {
        super(orderRepo);
        this.orderItemsRepo = orderItemsRepo;
        this.flowerRepo = flowerRepo;
        this.couponRepo = couponRepo;
        this.shopRepo = shopRepo; // Add shop repository
        this.repository = orderRepo; // Make sure the repository is properly set
    }


    createOrder({
                    Name,
                    Email,
                    Phone,
                    DeliveryAddress,
                    DeliveryLatitude,
                    DeliveryLongitude,
                    ShopId,
                    TotalPrice,
                    UserTimezone,
                    CouponCode,
                    OrderItems
                }) {
        // Рассчитать общую цену
        let totalPrice = 0;
        OrderItems.forEach(i => {
            const flower = this.flowerRepo.getById(i.FlowerId);
            if (!flower) throw new Error(`Flower ID ${i.FlowerId} not found`);
            totalPrice += flower.Price * i.Quantity;
        });

        // Применить купон
        if (CouponCode) {
            const coupon = this.couponRepo.getCouponByCode(CouponCode);
            if (coupon) totalPrice = totalPrice * (1 - coupon.Discount / 100);
        }

        const orderId = uuidv4();

        this.repository.insert({  // Changed from orderRepo to repository
            Id: orderId,
            Name: Name,
            Email: Email,
            Phone: Phone,
            DeliveryAddress: DeliveryAddress,
            DeliveryLatitude: DeliveryLatitude,
            DeliveryLongitude: DeliveryLongitude,
            ShopId,
            CouponCode: CouponCode || null,
            TotalPrice: totalPrice,
            UserTimezone: UserTimezone
        });

        // Добавить позиции заказа
        OrderItems.forEach(i => {
            this.orderItemsRepo.insert({
                OrderId: orderId, FlowerId: i.FlowerId, Quantity: i.Quantity
            });
        });

        return this.repository.getOrderWithItems(orderId);
    }

    getOrdersByEmail(email) {
        const orders = this.repository.getOrdersByEmail(email);
        return orders.map(o => this.repository.getOrderWithItems(o.Id));
    }

    async getById(orderId) {
        const order = await this.repository.getById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        
        // Get order with items
        const orderWithItems = await this.getOrderWithItems(orderId);
        
        // Get shop information
        if (order.ShopId) {
            try {
                const shop = await this.shopRepo.getById(order.ShopId);
                orderWithItems.shop = shop;
            } catch (error) {
                console.error('Error fetching shop info:', error);
                orderWithItems.shop = null;
            }
        }
        
        // Get detailed item information
        if (orderWithItems.items && orderWithItems.items.length > 0) {
            try {
                const itemDetails = await Promise.all(
                    orderWithItems.items.map(async (item) => {
                        const flower = await this.flowerRepo.getById(item.FlowerId);
                        return {
                            ...item,
                            name: flower?.Name,
                            price: flower?.Price,
                            imageUrl: flower?.ImageUrl,
                            description: flower?.Description
                        };
                    })
                );
                orderWithItems.items = itemDetails;
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        }
        
        return orderWithItems;
    }

    async getOrderWithItems(orderId) {
        return this.repository.getOrderWithItems(orderId);
    }

    applyCoupon(orderId, couponCode) {
        const coupon = this.couponRepo.getCouponByCode(couponCode);
        if (!coupon) throw new Error('Invalid coupon code');
        this.repository.applyCoupon(orderId, couponCode);
        return this.repository.getOrderWithItems(orderId);
    }
}

module.exports = OrdersService;