# API Documentation

## Endpoints

### POST /users/register

Register a new user.

#### Request

- **URL**: `/users/register`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }
  ```

#### Response

- **Success**: 
  - **Status Code**: `201 Created`
  - **Body**:
    ```json
    {
      "token": "jwt_token",
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "socketid": null
      }
    }
    ```

- **Validation Errors**:
  - **Status Code**: `400 Bad Request`
  - **Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "First name is required and must be at least 2 characters",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Last name is required and must be at least 2 characters",
          "param": "fullname.lastname",
          "location": "body"
        },
        {
          "msg": "Password is required and must be at least 5 characters",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

- **Email Already in Use**:
  - **Status Code**: `400 Bad Request`
  - **Body**:
    ```json
    {
      "error": "Email is already in use"
    }
    ```

- **Server Error**:
  - **Status Code**: `500 Internal Server Error`
  - **Body**:
    ```json
    {
      "error": "Internal Server Error"
    }
    ```
