class CouponsController {
    constructor(couponsService) {
        this.service = couponsService;
    }

    getAll(req, res) {
        const coupons = this.service.getAllCoupons();
        res.json(coupons);
    }

    validate(req, res) {
        const {code} = req.params;
        const coupon = this.service.validateCoupon(code);
        if (!coupon) return res.status(404).json({error: 'Coupon not found'});
        res.json(coupon);
    }
}

module.exports = CouponsController;
