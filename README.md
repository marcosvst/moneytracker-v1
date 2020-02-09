# Moneytracker

That's a simple Node.js and MongoDB API to track your money. You can add expenses, tag and categorize them and have much more control over your finances.

>It was used express, mongoose and JWT as well.

This project is deployed on Heroku, so you can use it fully online. You can check how to use at the **Using Online** section.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Node.js
Npm
```

### Setting up

A step by step series of examples that tell you how to get a development env running

Clone the repo to your machine

```
git clone https://github.com/marcosvst/moneytracker.git
```

Open it and install the modules

```
npm install
```

Run the server and that's it

```
npm start
```

*In order for the app to work, you'll have to create a .env file and set the env variables. It's also important to add a SALT_KEY to it.*

```
CONNECTION_STRING=YOUR_CONNECTION_STRING
SALT_KEY=YOUR_SALT_KEY
```

## Using Online

#### Users

To register your account

```
HTTP: POST
URL: https://moneytracker-v1.herokuapp.com/users
```
```json
{
    "name": "Your name",
    "email": "Your e-mail",
    "password": "Your password"
}
```

Getting a JWT token to validate your requests

```
HTTP: POST
URL: https://moneytracker-v1.herokuapp.com/users/authenticate
```
```json
{
    "email": "Your e-mail",
    "password": "Your password"
}
```

#### Expenses

To register a expense

```
HTTP: POST
HEADER: x-access-token
URL: https://moneytracker-v1.herokuapp.com/expenses
```

>Category is a ENUM: ['Food', 'Health', 'Fun', 'Need', 'Gift', 'Medication', 'Other', 'Education']

```json
{
  	"title": "Ice cream",
	"description": "Weekend on the beach",
	"price": 7.00,
	"category": "Fun",
	"tags": [
		"food",
		"beach"
	]
}
```

Updating a expense

```
HTTP: PUT
HEADER: x-access-token
URL: https://moneytracker-v1.herokuapp.com/expenses/:id
```
```json
{
  	"title": "Vanilla ice cream",
	"tags": [
		"beach"
	]
}
```

Getting all expenses

```
HTTP: GET
HEADER: x-access-token
URL: https://moneytracker-v1.herokuapp.com/expenses
```

Getting expenses by category

```
HTTP: GET
HEADER: x-access-token
URL: https://moneytracker-v1.herokuapp.com/expenses/category/:category
```

Getting expenses by id

```
HTTP: GET
HEADER: x-access-token
URL: https://moneytracker-v1.herokuapp.com/expenses/:id
```

Getting expenses by tag

```
HTTP: GET
HEADER: x-access-token
URL: https://moneytracker-v1.herokuapp.com/expenses/tags/:tag
```

## Author

* **Marcos Vinícius** - *Initial work* - [marcosvst](https://github.com/marcosvst)
