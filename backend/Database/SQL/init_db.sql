CREATE TABLE IF NOT EXISTS FlowerShops
(
    Id        INTEGER PRIMARY KEY AUTOINCREMENT,
    Name      TEXT NOT NULL,
    Address   TEXT NOT NULL,
    Latitude  REAL,
    Longitude REAL
);

CREATE TABLE IF NOT EXISTS Flowers
(
    Id          INTEGER PRIMARY KEY AUTOINCREMENT,
    ShopId      INTEGER NOT NULL,
    Name        TEXT    NOT NULL,
    Description TEXT,
    Price       REAL    NOT NULL,
    DateAdded   DATETIME DEFAULT CURRENT_TIMESTAMP,
    ImageUrl    TEXT,
    IsFavorite  INTEGER  DEFAULT 0, -- 0 = нет, 1 = избранное
    FOREIGN KEY (ShopId) REFERENCES FlowerShops (Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Orders
(
    Id                TEXT PRIMARY KEY, -- UUID
    Email             TEXT NOT NULL,
    Phone             TEXT NOT NULL,
    DeliveryAddress   TEXT NOT NULL,
    DeliveryLatitude  REAL,
    DeliveryLongitude REAL,
    ShopId            INTEGER,          -- добавлено для связи с магазином
    CouponCode        TEXT,             -- применённый купон
    TotalPrice        REAL NOT NULL,
    CreatedAt         DATETIME DEFAULT CURRENT_TIMESTAMP,
    UserTimezone      TEXT,
    FOREIGN KEY (ShopId) REFERENCES FlowerShops (Id)
);

CREATE TABLE IF NOT EXISTS OrderItems
(
    Id       INTEGER PRIMARY KEY AUTOINCREMENT,
    OrderId  TEXT    NOT NULL,
    FlowerId INTEGER NOT NULL,
    Quantity INTEGER NOT NULL,
    FOREIGN KEY (OrderId) REFERENCES Orders (Id) ON DELETE CASCADE,
    FOREIGN KEY (FlowerId) REFERENCES Flowers (Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Coupons
(
    Id       INTEGER PRIMARY KEY AUTOINCREMENT,
    Code     TEXT NOT NULL UNIQUE,
    Discount REAL NOT NULL
);

-- Индексы
CREATE INDEX IF NOT EXISTS idx_flowers_shopid
    ON Flowers (ShopId);

CREATE INDEX IF NOT EXISTS idx_orderitems_orderid
    ON OrderItems (OrderId);

CREATE INDEX IF NOT EXISTS idx_orderitems_flowerid
    ON OrderItems (FlowerId);

CREATE INDEX IF NOT EXISTS idx_orders_createdat
    ON Orders (CreatedAt);
