CREATE TABLE IF NOT EXISTS Shops
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
    FOREIGN KEY (ShopId) REFERENCES Shops (Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Orders
(
    Id                TEXT PRIMARY KEY, -- UUID
    Name              TEXT NOT NULL,
    Email             TEXT NOT NULL,
    Phone             TEXT NOT NULL,
    DeliveryAddress   TEXT NOT NULL,
    DeliveryLatitude  REAL,
    DeliveryLongitude REAL,
    ShopId            INTEGER,          -- добавлено для связи с магазином
    TotalPrice        REAL NOT NULL,
    CreatedAt         DATETIME DEFAULT CURRENT_TIMESTAMP,
    DeliveryDateTime  DATETIME DEFAULT CURRENT_TIMESTAMP,
    UserTimezone      TEXT,
    FOREIGN KEY (ShopId) REFERENCES Shops (Id)
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

CREATE TABLE IF NOT EXISTS UsersFavorites
(
    Id         INTEGER PRIMARY KEY AUTOINCREMENT,
    UserId     TEXT    NOT NULL,
    FlowerId   INTEGER NOT NULL,
    IsFavorite INTEGER,
    FOREIGN KEY (FlowerId) REFERENCES Flowers (Id) ON DELETE CASCADE
);


CREATE INDEX IF NOT EXISTS idx_flowers_shopid
    ON Flowers (ShopId);

CREATE INDEX IF NOT EXISTS idx_orderitems_orderid
    ON OrderItems (OrderId);

CREATE INDEX IF NOT EXISTS idx_orderitems_flowerid
    ON OrderItems (FlowerId);

CREATE INDEX IF NOT EXISTS idx_orders_createdat
    ON Orders (CreatedAt);

CREATE INDEX IF NOT EXISTS idx_usersfavorites_flowerid
    ON UsersFavorites (FlowerId);
