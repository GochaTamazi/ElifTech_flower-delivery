const express = require('express');
const BaseController = require('./BaseController');

class CouponsController extends BaseController {
    constructor(couponsService) {
        super(couponsService);
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/', this.getAll.bind(this));
        this.router.get('/validate/:code', this.validate.bind(this));
    }

    getRouter() {
        return this.router;
    }

    getAll(req, res) {
        try {
            const coupons = this.service.getAllCoupons();
            return this.success(res, coupons);
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    validate(req, res) {
        try {
            const {code} = req.params;
            const coupon = this.service.validateCoupon(code);
            if (!coupon) return this.notFound(res, 'Coupon not found');
            return this.success(res, coupon);
        } catch (error) {
            return this.handleError(res, error);
        }
    }
}

module.exports = CouponsController;
