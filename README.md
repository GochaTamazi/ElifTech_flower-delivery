# Flower Delivery App

Web application where users can order flowers delivery.

## Overview

This project was implemented according to the Flower Delivery test task.  
It consists of three main levels of complexity: Base, Middle, and Advanced.  

Currently, the project includes the Base and Middle levels fully implemented, and part of the Advanced level (pagination for flower lists).  
Unfortunately, due to time constraints, not all Advanced-level features could be completed.  
After deployment, some minor functionalities stopped working, so what is shown now reflects the current working state.  

If more time was available, I would have fixed the remaining bugs and implemented all remaining features.  

## Features Implemented

### Base Level
- **Flower shops page:** Users can choose a flower shop and add bouquets or single flowers to the cart (data from the database).  
- **Shopping cart page:** Users can review all added products, remove some, or change the quantity.  
- **Order submission:** Users can input email, phone number, and delivery address, and submit the order to be saved in the database.  

### Middle Level
- **Sorting:** Users can sort flowers by price and/or date added.  
- **Favorites:** Users can mark bouquets as favorites, which are displayed first when sorting.  
- **Cart storage:** The shopping cart is saved in local storage.  
- **Order details:** Orders include date and time correctly adjusted to the user’s timezone. Users are redirected to a page showing unique order ID, list of products, total price, delivery address, and order timestamp.  

### Advanced Level (Partial)
- **Pagination:** Implemented on the flower shops page to make browsing large catalogs more convenient.  

## API

**Backend:** [Railway Deployment](https://eliftechflower-delivery-public-backend-production.up.railway.app/)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /shops | Get list of flower shops |
| GET    | /flowers/shop/:shopId?sortBy=:sortField&sortOrder=:sortDir&page=:page&pageSize=:pageSize | Get flowers by shop, with sorting and pagination |
| GET    | /orders/:orderId | Get order details by ID |
| POST   | /orders/ | Create a new order |
| POST   | /favorites/:flowerId | Add a flower to favorites |
| DELETE | /favorites/:favoriteId | Remove a flower from favorites |
| GET    | /session/check | Check session validity |
| GET    | /session/init | Initialize session |

## Frontend

**React App:** [Vercel Deployment](https://elif-tech-flower-delivery-public-frontend-8vz7qvx1p.vercel.app/)

## Notes

Some advanced features like Google Maps integration, order history, and coupons page were not completed due to limited time.  

Unfortunately, after deployment, some features may not work as expected.


