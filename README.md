# Airbean-API - API Documentation

When starting the server with no db files, the products database will autofill. The database for users will insert a default admin and customer.

Admin management: To obtain the JWT token, you need to log in with admin credentials using the login endpoint and copy the token provided in the response. This token will then be used in the Authorization header for admin-only requests.

## Authentication and Authorization

For endpoints requiring authentication:

**Authentication Type:** Bearer Token  
**Token:** `<your_jwt_token>`  

Endpoints requiring admin authorization are marked with (Admin only).

## User Operations

### Create New Customer

**Method:** POST  
**URL:** `http://localhost:3000/user/account`

**Request Body (JSON):**  
```JSON
{
    "firstName": "Customer",
    "lastName": "Customerson",
    "email": "customer@example.com",
    "password": "customerpassword",
    "phoneNumber": "8888888888",
    "role": "user"
}
```

### Create New Admin

**Method:** POST  
**URL:** `http://localhost:3000/user/account`

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

## Login Operations

### Login Customer

**Method:** POST  
**URL:** `http://localhost:3000/login`

**Request Body (JSON):**
```JSON
{
    "email": "customer@example.com",
    "password": "customerpassword"
}
```

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

### Logout User

**Method:** POST  
**URL:** `http://localhost:3000/logout`

**Description:** Logout the currently logged-in user.

## Products

### Get All Products

**Method:** GET  
**URL:** `http://localhost:3000/products`

**Description:** Retrieve all products.

## Cart Operations

### Get Cart

**Method:** GET  
**URL:** `http://localhost:3000/cart`

**Authorization:** Required (Customer only)

**Description:** Retrieve the cart of the logged-in user.

### Add Product to Cart

**Method:** POST  
**URL:** `http://localhost:3000/cart/:productId`

**Authorization:** Required (Customer only)

**Description:** Add a product to the logged-in user's cart using the product ID as a route parameter.

### Remove Product from Cart

**Method:** DELETE  
**URL:** `http://localhost:3000/cart/:productId`

**Authorization:** Required (Customer only)

**Description:** Remove a product from the logged-in user's cart using the product ID as a route parameter.

## Order Operations

### Create New Order

**Method:** POST  
**URL:** `http://localhost:3000/orders`

**Authorization:** Required (Customer only)

**Description:** Create a new order. This will empty the user's cart and add the items to the user's order history.

### Get Specific Order

**Method:** GET  
**URL:** `http://localhost:3000/orders/:orderId`

**Authorization:** Required (Customer only)

**Description:** Retrieve details of a specific order using the order ID.

## Order History

### Get Order History

**Method:** GET  
**URL:** `http://localhost:3000/order-history`

**Authorization:** Required (Customer only)

**Description:** Retrieve the order history of the logged-in user.

## About

### Get About Information

**Method:** GET  
**URL:** `http://localhost:3000/about`

**Description:** Retrieve about information.

## Admin Operations

### Add New Product

**Method:** POST  
**URL:** `http://localhost:3000/admin/products`

**Authorization:** Required (Admin only)

**Description:** Use the provided data to add a new product.

**Request Body (JSON):**
```JSON
{
    "title": "New Product Name",
    "desc": "Description of the new product",
    "price": 59
}
```

### Update Existing Product

**Method:** PUT  
**URL:** `http://localhost:3000/admin/products/:productId`

**Authorization:** Required (Admin only)

**Description:** Update an existing product using the product ID as a route parameter. Use the provided data to update a product.

**Request Body (JSON):**
```JSON
{
    "title": "Modified product name",
    "desc": "Modified product description",
    "price": 39
}
```

### Remove Product

**Method:** DELETE  
**URL:** `http://localhost:3000/admin/products/:productId`

**Authorization:** Required (Admin only)

**Description:** Remove a product using the product ID as a route parameter.

### Get All Users

**Method:** GET  
**URL:** `http://localhost:3000/admin/users`

**Authorization:** Required (Admin only)

**Description:** Retrieves all users. This operation is restricted to admin users.

### Get Profile

**Method:** GET  
**URL:** `http://localhost:3000/admin/users/profile`

**Authorization:** Required (Admin only)

**Description:** Retrieves the profile of the logged-in user.

### Delete User

**Method:** DELETE  
**URL:** `http://localhost:3000/admin/users`

**Authorization:** Required (Admin only)

**Description:** Delete the logged-in user.

## Campaign Operations

### Create New Campaign

**Method:** POST  
**URL:** `http://localhost:3000/admin/campaigns`

**Authorization:** Required (Admin only)

**Description:** Use the provided data to create a new campaign. Ensure that all products exist in product.db before creating the campaign.

**Request Body (JSON):**
```JSON
{
    "products": ["<productId1>", "<productId2>"],
    "campaignPrice": 99
}
```

### Get All Campaigns

**Method:** GET  
**URL:** `http://localhost:3000/admin/campaigns`

**Authorization:** Required (Admin only)

**Description:** Retrieve all created campaigns.
