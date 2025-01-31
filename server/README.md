# Bookstore server API documentation

## Overview

This API provides endpoints for managing books and user authentication. It includes functionality for creating, retrieving, updating, and deleting books, as well as user registration, login, and avatar upload.

## API Endpoints

### User Authentication

#### Registration

- **Description:** Register a new user.
- **URL:** `/api/users/register`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: multipart/form-data`
- **Request Body:**
  - `name` (string, required): The name of the user.
  - `email` (string, required): The email of the user.
  - `password` (string, required): The password for the user.
  - `avatar` (file, optional): The avatar image file for the user.
- **Success Response:**
  - **Code:** 201 Created
  - **Content:**
    ```json
    {
      "user": {
        "email": "string",
        "name": "string",
        "avatarURL": "string",
        "role": "string"
      },
      "token": "string"
    }
    ```
- **Error Responses:**
  - **Code:** 400 Bad Request
  - **Content:**
    ```json
    {
      "message": "error message"
    }
    ```
  - **Code:** 409 Conflict
  - **Content:**
    ```json
    {
      "message": "error message"
    }
    ```

- **Example Request:**
  ```
  curl -X POST "http://base-url/api/users/register"
  -H "Content-Type: multipart/form-data"
  -F "name=John Doe"
  -F "email=johndoe@example.com"
  -F "password=SecurePassword123"
  -F "avatar=@path/to/avatar.jpg"
  ```
#### Login

- **Description:** Log in a user.
- **URL:** `/api/users/login`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`
- **Request Body:**
  - `email` (string, required): The email of the user.
  - `password` (string, required): The password for the user.
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "user": {
        "email": "string",
        "name": "string",
        "avatarURL": "string",
        "role": "string"
      },
      "token": "string"
    }
    ```
- **Error Responses:**
  - **Code:** 400 Bad Request
  - **Content:**
    ```json
    {
      "message": "error message"
    }
    ```
  - **Code:** 401 Unauthorized
  - **Content:**
    ```json
    {
      "message": "error message"
    }
    ```

- **Example Request:**
  ```
  curl -X POST "http://base-url/api/users/login"
  -H "Content-Type: application/json"
  -d '{
  "email": "johndoe@example.com",
  "password": "SecurePassword123"
  }'
  ```

#### Get Current User

- **Description:** Retrieve the currently authenticated user's details.
- **URL:** `/api/users/current`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "email": "string",
      "name": "string",
      "avatarURL": "string",
      "role": "string"
    }
    ```
- **Error Response:**
  - **Code:** 401 Unauthorized
  - **Content:**
    ```json
    {
      "message": "error message"
    }
    ```

- **Example Request:**
  ```
  curl -X GET "http://base-url/api/users/current"
  -H "Authorization: Bearer <token>"
  ```

#### Logout

- **Description:** Log out the currently authenticated user.
- **URL:** `/api/users/logout`
- **Method:** `POST`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Success Response:**
  - **Code:** 204 No Content
  - **Content:** No content

- **Error Response:**
  - **Code:** 401 Unauthorized
  - **Content:**
    ```json
    {
      "message": "error message"
    }
    ```

- **Example Request:**
  ```
  curl -X POST "http://base-url/api/users/logout"
  -H "Authorization: Bearer <token>"
  ```

#### Update User Avatar

- **Description:** Update the avatar of the currently authenticated user.
- **URL:** `/api/users/avatars`
- **Method:** `PATCH`
- **Headers:**
  - `Authorization: Bearer <token>`
  - `Content-Type: multipart/form-data`
- **Request Body:**
  - `avatar` (file, required): The new avatar image file.

- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "avatarURL": "string"
    }
    ```

- **Error Responses:**
  - **Code:** 400 Bad Request
  - **Content:**
    ```json
    {
      "message": "string"
    }
    ```
  - **Code:** 401 Unauthorized
  - **Content:**
    ```json
    {
      "message": "string"
    }
    ```

- **Example Request:**
  ```
  curl -X PATCH "http://base-url/api/users/avatars"
  -H "Authorization: Bearer <token>"
  -H "Content-Type: multipart/form-data"
  -F "avatar=@path/to/new-avatar.jpg"
  ```

### Books

#### Get All Books

- **Description:** Retrieve a list of all books with optional search, filter, and pagination.
- **URL:** `/api/books`
- **Method:** `GET`
- **Query Parameters:**

  - `page` (integer, optional, default: 1): The page number to retrieve.
  - `limit` (integer, optional, default: 8): The number of books per page.
  - `bookTitle` (string, optional): The title of the book to search for.
  - `priceRange` (string, optional, default: `any`): The price range to filter books. Options:
    - `up_to_15`: Books priced up to $15.
    - `15_to_30`: Books priced between $15 and $30.
    - `30_plus`: Books priced above $30.
    - `any`: No price filtering.
  - `sortBy` (string, optional): The field to sort by. Options:
    - `price`: Sort by price in ascending order.
    - `-price`: Sort by price in descending order.

- **Success Response:**

  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "books": [
        {
          "_id": "string",
          "title": "string",
          "author": "string",
          "price": "number",
          "description": "string",
          "image": "string",
          "level": "string",
          "tags": [
            "string"
          ],
          "amount": "number",
          "shortDescription": "string"
        }
        ...
      ],
      "totalBooks": "number",
      "limit": "number",
      "page": "number",
      "totalPages": "number",
      "hasPrevPage": "boolean",
      "hasNextPage": "boolean",
      "prevPage": "number | null",
      "nextPage": "number | null"
    }
    ```

- **Error Response:**

  - **Code:** 401 Unauthorized
  - **Content:**
    ```json
    {
      "message": "error message"
    }
    ```

- **Example Request:**

  ```
  curl -X GET "http://base-url/api/books?page=1&limit=8&bookTitle=react&priceRange=15_to_30&sortBy=price" -H "Authorization: Bearer <token>"
  ```

#### Get Book by ID

- **Description:** Retrieve a single book by its unique identifier.
- **URL:** `/api/books/:id`
- **Method:** `GET`
- **URL Parameters:**
  - `id` (string, required): The unique identifier of the book.
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "_id": "string",
      "title": "string",
      "author": "string",
      "price": "number",
      "description": "string",
      "image": "string",
      "level": "string",
      "tags": ["string"],
      "amount": "number",
      "shortDescription": "string"
    }
    ```
- **Error Responses:**

  - **Code:** 400 Bad Request
  - **Content:**
    ```json
    {
      "message": "error message"
    }
    ```
  - **Code:** 401 Unauthorized
  - **Content:**
    ```json
    {
      "message": "error message"
    }
    ```
  - **Code:** 404 Not Found
  - **Content:**
    ```json
    {
      "message": "error message"
    }
    ```
- **Example Request:**

  ```
  curl -X GET "http://base-url/api/books/668a19b620c7c46a3cc7e1c5" -H "Authorization: Bearer <token>"
  ```

#### Create Book

- **Description:** Create a new book. Only admin users can create books.
- **URL:** `/api/books`
- **Method:** `POST`
- **Headers:**
  - `Authorization: Bearer <token>` (Admin only)
  - `Content-Type: multipart/form-data`
- **Request Body:**
  - `author` (string, required): The author of the book.
  - `price` (number, required): The price of the book.
  - `title` (string, required): The title of the book.
  - `level` (string, required): The reading level of the book.
  - `tags` (array of strings, required): Tags associated with the book.
  - `amount` (number, required): The amount of copies available.
  - `shortDescription` (string, required): A short description of the book.
  - `description` (string, required): A detailed description of the book.
  - `image` (file, required): The image file of the book cover.

- **Success Response:**

  - **Code:** 201 Created
  - **Content:**
    ```json
    {
      "_id": "string",
      "author": "string",
      "price": "number",
      "title": "string",
      "level": "string",
      "tags": ["string"],
      "amount": "number",
      "shortDescription": "string",
      "description": "string",
      "image": "string",
      "cloudinaryImagePath": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
    ```

- **Error Responses:**

  - **Code:** 400 Bad Request
  - **Content:**
    ```json
    {
      "message": "string"
    }
    ```
  - **Code:** 401 Unauthorized
  - **Content:**
    ```json
    {
      "message": "string"
    }
    ```
  - **Code:** 403 Forbidden
  - **Content:**
    ```json
    {
      "message": "string"
    }
    ```

- **Example Request:**

  ```
  curl -X POST "http://base-url/api/books"
  -H "Authorization: Bearer <token>"
  -H "Content-Type: multipart/form-data"
  -F "author=John Doe"
  -F "price=19.99"
  -F "title=JavaScript Essentials"
  -F "level=Beginner"
  -F "tags[]=JavaScript"
  -F "tags[]=Programming"
  -F "amount=100"
  -F "shortDescription=An introduction to JavaScript"
  -F "description=A comprehensive guide to learning JavaScript."
  -F "image=@path/to/image.jpg"
  ```
#### Delete Book by ID

- **Description:** Delete a single book by its unique identifier. Only admin users can delete books.
- **URL:** `/api/books/:id`
- **Method:** `DELETE`
- **Headers:**
  - `Authorization: Bearer <token>` (Admin only)
- **URL Parameters:**
  - `id` (string, required): The unique identifier of the book.
- **Success Response:**
  - **Code:** 204 No Content
  - **Content:** No content
- **Error Responses:**
  - **Code:** 400 Bad Request
  - **Content:**
    ```json
    {
      "message": "string"
    }
    ```
  - **Code:** 401 Unauthorized
  - **Content:**
    ```json
    {
      "message": "string"
    }
    ```
  - **Code:** 403 Forbidden
  - **Content:**
    ```json
    {
      "message": "string"
    }
    ```
  - **Code:** 404 Not Found
  - **Content:**
    ```json
    {
      "message": "string"
    }
    ```

- **Example Request:**
  ```
  curl -X DELETE "http://base-url/api/books/668a19b620c7c46a3cc7e1c5" -H "Authorization: Bearer <token>"
  ```

## Environment Variables

- **PORT**: Port on which the server runs.
- **DB_HOST**: MongoDB connection string.
- **SECRET_KEY**: Secret key for JWT.
- **DEFAULT_AVATAR**: Default avatar URL.
- **CLOUDINARY_CLOUD_NAME**: Cloudinary cloud name.
- **CLOUDINARY_API_KEY**: Cloudinary API key.
- **CLOUDINARY_SECRET_KEY**: Cloudinary API secret.
