const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const app = express();

// Trust first proxy (important if behind a proxy like nginx)
app.set('trust proxy', 1);

// Security headers
app.use(helmet());

// Parse JSON bodies
app.use(express.json());

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Cookie parser middleware
app.use(cookieParser());

// Session configuration
const sessionConfig = {
    secret: 'your-secret-key-vr4jOYc62KcCfBux', resave: false, saveUninitialized: false, proxy: true, cookie: {
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production (HTTPS)
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 12 * 31 * 24 * 60 * 60 * 1000, // 1 year
        domain: process.env.NODE_ENV === 'production' ? '.yourdomain.com' : undefined
    }, name: 'sessionId', // Recommended for production with a session store
    // store: new (require('connect-pg-simple')(session))()
};

app.use(session(sessionConfig));


// Initialize database
const initDB = require('./Database/initDB');
const db = require('./Database/db').getInstance();
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
