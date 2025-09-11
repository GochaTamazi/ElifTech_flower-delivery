const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());


// Initialize database
const initDB = require('./Database/initDB');
const db = require('./Database/db').getInstance();
initDB();


// Initialize repositories
const couponsRepo = new (require('./DataAccess/CouponsRepository'))(db);
const shopsRepo = new (require('./DataAccess/ShopsRepository'))(db);
const flowersRepo = new (require('./DataAccess/FlowersRepository'))(db);
const ordersRepo = new (require('./DataAccess/OrdersRepository'))(db);
const orderItemsRepo = new (require('./DataAccess/OrderItemsRepository'))(db);


// Initialize services
const couponsService = new (require('./Business/CouponService'))(couponsRepo);
const shopsService = new (require('./Business/ShopsService'))(shopsRepo, flowersRepo);
const flowersService = new (require('./Business/FlowersService'))(flowersRepo);
const orderItemsService = new (require('./Business/OrderItemsService'))(orderItemsRepo);
const ordersService = new (require('./Business/OrdersService'))(ordersRepo, orderItemsRepo, flowersRepo, couponsRepo, shopsRepo);


// Initialize controllers
const shopsController = new (require('./AppWeb/ShopsController'))(shopsService);
const flowersController = new (require('./AppWeb/FlowersController'))(flowersService);
const ordersController = new (require('./AppWeb/OrdersController'))(ordersService);
const orderItemsController = new (require('./AppWeb/OrderItemsController'))(orderItemsService);
const couponsController = new (require('./AppWeb/CouponsController'))(couponsService);


// Setup routes
app.use('/shops', shopsController.getRouter());
app.use('/flowers', flowersController.getRouter());
app.use('/orders', ordersController.getRouter());
app.use('/order-items', orderItemsController.getRouter());
app.use('/coupons', couponsController.getRouter());


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: 'Something went wrong!'});
});


// Start server
app.listen(3000, () => console.log('Server started on http://localhost:3000'));
