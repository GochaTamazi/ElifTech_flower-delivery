const express = require('express');
const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

const session = require('express-session');
const cookieParser = require('cookie-parser');

// Подключаем middleware для работы с куками
app.use(cookieParser());

// Настройка сессий
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 12 * 31 * 24 * 60 * 60 * 1000
    },
    name: 'sessionId'
}));


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

const SessionController = require('./AppWeb/SessionController');
const sessionController = new SessionController();

// Setup routes
app.use('/shops', shopsController.getRouter());
app.use('/flowers', flowersController.getRouter());
app.use('/orders', ordersController.getRouter());
app.use('/order-items', orderItemsController.getRouter());
app.use('/coupons', couponsController.getRouter());

// Подключение контроллера сессий
app.use('/session', sessionController.getRouter());


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: 'Something went wrong!'});
});


// Start server
app.listen(3000, () => console.log('Server started on http://localhost:3000'));
