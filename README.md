# Airbean-API - API Documentation

When starting the server with no db files, the products database will autofill. The database for users will insert a default admin and customer.

## User Operations

### Create New User (Admin or Customer)

**Method:** POST  
**URL:** `http://localhost:3000/user/account`

**Request Body (JSON):**
```JSON
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "phoneNumber": "1234567890",
    "role": "customer"
}
```

### Get All Users

**Method:** GET  
**URL:** `http://localhost:3000/user`

**Authorization:** Required (Admin only)  
**Description:** Retrieves all users. This operation is restricted to admin users.

### Get Profile

**Method:** GET  
**URL:** `http://localhost:3000/user/profile`

**Authorization:** Required  
**Description:** Retrieves the profile of the logged-in user.

### Delete User

**Method:** DELETE  
**URL:** `http://localhost:3000/user`

**Authorization:** Required  
**Description:** Delete the logged-in user.

## Login Operations

### Login User

**Method:** POST  
**URL:** `http://localhost:3000/login`

**Request Body (JSON):**
```JSON
{
    "email": "customer@example.com",
    "password": "customerpassword"
}
```

### Logout User

**Method:** POST  
**URL:** `http://localhost:3000/logout`

**Description:** Logout the currently logged-in user.

### Admin Login

**Method:** POST  
**URL:** `http://localhost:3000/login`

**Request Body (JSON):**
```JSON
{
    "email": "admin@adminmail.com",
    "password": "adminpassword"
}
```

## Products

### Get All Products

**Method:** GET  
**URL:** `http://localhost:3000/products`

**Description:** Retrieve all products.

## Cart Operations

### Get Cart

**Method:** GET  
**URL:** `http://localhost:3000/cart`

**Description:** Retrieve the cart of the logged-in user.

### Add Product to Cart

**Method:** POST  
**URL:** `http://localhost:3000/cart/:productId`

**Description:** Add a product to the logged-in user's cart using the product ID as a route parameter.

### Remove Product from Cart

**Method:** DELETE  
**URL:** `http://localhost:3000/cart/:productId`

**Description:** Remove a product from the logged-in user's cart using the product ID as a route parameter.

## Order Operations

### Create New Order

**Method:** POST  
**URL:** `http://localhost:3000/orders`

**Description:** Create a new order. This will empty the user's cart and add the items to the user's order history.

### Get Specific Order

**Method:** GET  
**URL:** `http://localhost:3000/orders/:orderId`

**Description:** Retrieve details of a specific order using the order ID provided in the response from the POST operation.

## Order History

### Get Order History

**Method:** GET  
**URL:** `http://localhost:3000/order-history`

**Description:** Retrieve the order history of the logged-in user.

## About

### Get About Information

**Method:** GET  
**URL:** `http://localhost:3000/about`

**Description:** Retrieve about information.

## Admin Operations

### Create New Admin

**Method:** POST  
**URL:** `http://localhost:3000/user/account`

**Description:** Use the provided data to create a new admin.

**Request Body (JSON):**
```JSON
{
    "firstName": "Admin",
    "lastName": "Adminson",
    "email": "admin@adminmail.com",
    "password": "adminpassword",
    "phoneNumber": "9999999999",
    "role": "admin"
}
```

## Product Management

### Add New Product

**Method:** POST  
**URL:** `http://localhost:3000/products`

**Description:** Use the provided data to add a new product.

**Request Body (JSON):**
```JSON
{
    "name": "NewProduct",
    "description": "Description of the new product",
    "price": 55 
}
```

### Update Existing Product

**Method:** PUT  
**URL:** `http://localhost:3000/products/:productId`

**Description:** Update an existing product using the product ID as a route parameter. Use the provided data to update a product.

**Request Body (JSON):**
```JSON
{
    "name": "UpdatedProduct",
    "description": "Updated description of the product",
    "price": 65
}
```

### Remove Product

**Method:** DELETE  
**URL:** `http://localhost:3000/products/:productId`

**Description:** Remove a product using the product ID as a route parameter.
