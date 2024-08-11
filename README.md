# Basic E-Commerce Shop API

### Users routes

-   [GET] /users
    > -   Gets all users
    > -   Authorization required
-   [POST] /users
    > -   Creates new user
    > -   No authorization required

### Auth routes

-   [POST] /auth/login
    > -   Handles user login
    > -   No authorization required
-   [POST] /auth/logout
    > -   Handles user logout
    > -   Not implemented yet

### Authorization

Send `Authorization` header with bearer token. (e.g. `Authorization: bearer [YOUR_TOKEN]`)

### Request payload

```json
//  [POST] /users
{
	"name": "string",
	"username": "string",
	"password": "string"
}
```

```json
//  [POST] /auth/login
{
	"username": "string",
	"password": "string"
}
```

### Response data

```json
//  [GET] /users
[
	{
		"_id": "66b8dc5e0a90ce00c86b2ed3",
		"name": "Seif Essam",
		"username": "seifessam",
		"__v": 0
	}
]
```

```json
//  [POST] /users
{
	"error": null,
	"code": "account_creation_succeed",
	"message": "Account creation succeeded",
	"data": {
		"access": "string"
	}
}
```

```json
//  [POST] /auth/login
{
	"error": null,
	"code": "login_succeed",
	"message": "Login succeeded",
	"data": {
		"access": "string"
	}
}
```
