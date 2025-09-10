class CouponsService {
    constructor(couponRepo) {
        this.couponRepo = couponRepo;
    }

    validateCoupon(code) {
        const coupon = this.couponRepo.getCouponByCode(code);
        return coupon ? coupon : null;
    }

    getAllCoupons() {
        return this.couponRepo.getAll();
    }
}

module.exports = CouponsService;