const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('path');

const app = express();

// Trust first proxy (important if behind a proxy like nginx)
app.set('trust proxy', 1);

// Security headers
app.use(helmet());

// Parse JSON bodies
app.use(express.json());

// CORS configuration
const allowedOrigins = [
    "https://elif-tech-flower-delivery-public-fr.vercel.app",
    "https://elif-tech-flower-delivery-public-frontend-8vz7qvx1p.vercel.app"
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
app.use(cors(corsOptions));
// Session configuration
const sessionConfig = {
    secret: 'your-secret-key-vr4jOYc62KcCfBux',
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
        secure: true, // Railway всегда через HTTPS
        httpOnly: true,
        sameSite: 'none', // важно для работы фронта с другого домена
        maxAge: 12 * 31 * 24 * 60 * 60 * 1000, // 1 год
    },
    name: 'sessionId',
};
app.use(session(sessionConfig));

// Cookie parser middleware
// app.use(cookieParser());

// Initialize database

const initDB = require('./Database/InitDB');
const db = require('./Database/Db').getInstance();
initDB();

// Initialize repositories
const flowersRepo = new (require('./DataAccess/FlowersRepository'))(db);
const ordersRepo = new (require('./DataAccess/OrdersRepository'))(db);
const orderItemsRepo = new (require('./DataAccess/OrderItemsRepository'))(db);
const shopsRepo = new (require('./DataAccess/ShopsRepository'))(db);
const usersFavoritesRepo = new (require('./DataAccess/UsersFavoritesRepository'))(db);

// Initialize services
const flowersService = new (require('./Business/FlowersService'))(flowersRepo);
const ordersService = new (require('./Business/OrdersService'))(ordersRepo, orderItemsRepo, flowersRepo, shopsRepo);
const shopsService = new (require('./Business/ShopsService'))(shopsRepo, flowersRepo);
const usersFavoritesService = new (require('./Business/UsersFavoritesService'))(usersFavoritesRepo);

// Initialize controllers
const flowersController = new (require('./AppWeb/FlowersController'))(flowersService);
const ordersController = new (require('./AppWeb/OrdersController'))(ordersService);
const sessionController = new (require('./AppWeb/SessionController'))();
const shopsController = new (require('./AppWeb/ShopsController'))(shopsService);
const usersFavoritesController = new (require('./AppWeb/UsersFavoritesController'))(usersFavoritesService);

// Setup routes
app.use('/flowers', flowersController.getRouter());
app.use('/orders', ordersController.getRouter());
app.use('/session', sessionController.getRouter());
app.use('/shops', shopsController.getRouter());
app.use('/favorites', usersFavoritesController.getRouter());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: 'Something went wrong!'});
});

// Start server
app.listen(3000, () => console.log('Server started on http://localhost:3000'));
