const {v4: uuidv4} = require('uuid');

class OrdersService {
    constructor(orderRepo, orderItemsRepo, flowerRepo, couponRepo) {
        this.orderRepo = orderRepo;
        this.orderItemsRepo = orderItemsRepo;
        this.flowerRepo = flowerRepo;
        this.couponRepo = couponRepo;
    }

    createOrder({email, phone, deliveryAddress, deliveryLat, deliveryLng, shopId, items, couponCode, userTimezone}) {
        // Рассчитать общую цену
        let totalPrice = 0;
        items.forEach(i => {
            const flower = this.flowerRepo.getById(i.FlowerId);
            if (!flower) throw new Error(`Flower ID ${i.FlowerId} not found`);
            totalPrice += flower.Price * i.Quantity;
        });

        // Применить купон
        if (couponCode) {
            const coupon = this.couponRepo.getCouponByCode(couponCode);
            if (coupon) totalPrice = totalPrice * (1 - coupon.Discount / 100);
        }

        const orderId = uuidv4();
        this.orderRepo.insert({
            Id: orderId,
            Email: email,
            Phone: phone,
            DeliveryAddress: deliveryAddress,
            DeliveryLatitude: deliveryLat,
            DeliveryLongitude: deliveryLng,
            ShopId,
            CouponCode: couponCode || null,
            TotalPrice: totalPrice,
            UserTimezone: userTimezone
        });

        // Добавить позиции заказа
        items.forEach(i => {
            this.orderItemsRepo.insert({
                OrderId: orderId, FlowerId: i.FlowerId, Quantity: i.Quantity
            });
        });

        return this.orderRepo.getOrderWithItems(orderId);
    }

    getOrdersByEmail(email) {
        const orders = this.orderRepo.getOrdersByEmail(email);
        return orders.map(o => this.orderRepo.getOrderWithItems(o.Id));
    }

    getOrderById(orderId) {
        return this.orderRepo.getOrderWithItems(orderId);
    }

    applyCoupon(orderId, couponCode) {
        const coupon = this.couponRepo.getCouponByCode(couponCode);
        if (!coupon) throw new Error('Invalid coupon code');
        this.orderRepo.applyCoupon(orderId, couponCode);
        return this.orderRepo.getOrderWithItems(orderId);
    }
}

module.exports = OrdersService;