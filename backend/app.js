const express = require('express');
const app = express();
app.use(express.json());

// Подключаем репозитории и сервисы
const initDB = require('./Database/initDB'); // путь к твоему initDB
const db = require('./Database/db').getInstance();

// Инициализация базы
initDB(); // <-- вызываем прямо здесь


const CouponsRepo = require('./DataAccess/CouponsRepository');
const FlowerShopsRepo = require('./DataAccess/FlowerShopsRepository');
const FlowersRepo = require('./DataAccess/FlowersRepository');
const OrdersRepo = require('./DataAccess/OrdersRepository');
const OrderItemsRepo = require('./DataAccess/OrderItemsRepository');


const FlowerShopsService = require('./Business/FlowerShopsService');
const FlowersService = require('./Business/FlowersService');
const OrdersService = require('./Business/OrderService');
const CouponsService = require('./Business/CouponService');

const flowerShopsService = new FlowerShopsService(new FlowerShopsRepo(db), new FlowersRepo(db));
const flowersService = new FlowersService(new FlowersRepo(db));
const ordersService = new OrdersService(new OrdersRepo(db), new OrderItemsRepo(db), new FlowersRepo(db), new CouponsRepo(db));
const couponsService = new CouponsService(new CouponsRepo(db));


// Подключаем контроллеры
const FlowerController = require('./AppWeb/controllers/FlowersController');
const FlowersController = require('./AppWeb/controllers/FlowersController');

const OrdersController = require('./AppWeb/controllers/OrdersController');
const CouponsController = require('./AppWeb/controllers/CouponsController');


const flowerShopsController = new FlowerController(flowerShopsService);
const flowersController = new FlowersController(flowersService);
const ordersController = new OrdersController(ordersService);
const couponsController = new CouponsController(couponsService);


// Подключаем маршруты
app.use('/shops', require('./AppWeb/routes/flowerShopsRoutes')(flowerShopsController));
app.use('/flowers', require('./AppWeb/routes/flowersRoutes')(flowersController));
app.use('/orders', require('./AppWeb/routes/ordersRoutes')(ordersController));
app.use('/coupons', require('./AppWeb/routes/couponsRoutes')(couponsController));

app.listen(3000, () => console.log('Server started on http://localhost:3000'));






