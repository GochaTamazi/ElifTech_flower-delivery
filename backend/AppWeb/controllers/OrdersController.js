class OrdersController {
    constructor(orderService) {
        this.service = orderService;
    }

    createOrder(req, res) {
        try {
            const order = this.service.createOrder(req.body);
            res.json(order);
        } catch (err) {
            res.status(400).json({error: err.message});
        }
    }

    getOrdersByEmail(req, res) {
        const {email} = req.params;
        const orders = this.service.getOrdersByEmail(email);
        res.json(orders);
    }

    getOrderById(req, res) {
        const {orderId} = req.params;
        const order = this.service.getOrderById(orderId);
        if (!order) return res.status(404).json({error: 'Order not found'});
        res.json(order);
    }

    applyCoupon(req, res) {
        const {orderId} = req.params;
        const {couponCode} = req.body;
        try {
            const order = this.service.applyCoupon(orderId, couponCode);
            res.json(order);
        } catch (err) {
            res.status(400).json({error: err.message});
        }
    }
}

module.exports = OrdersController;
