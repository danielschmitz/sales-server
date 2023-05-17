# Sales Server

A minimalistic Sales Server NodeJS API with Express, Knex (sqlite/pg) and Joi.

## Install

```
git clone https://github.com/danielschmitz/sales-server.git
cd sales-server
npm install
npm run createdb
npm run dev
```

Go to `localhost:3000/api-docs`

Atfer the installation, you can always run the server using the `npm run dev` command.

## How get the Authorization Token

To make some calls to the API, you must be logged in. To do this, go to the `/auth/login` row in swagger and click on the "Try it Out" button:

<details>
  <summary>Image Example</summary>
  <img src="https://user-images.githubusercontent.com/1509692/213529709-1cf94fa8-f3c8-474b-9cbe-eeb7c4dd4eca.png">
</details>

The swagger setup already comes with the email and password information for user 1. Thus, you do not need to provide any information. Just click the "Execute" button

<details>
  <summary>Image Example</summary>
  <img src="https://user-images.githubusercontent.com/1509692/213527879-ecf0f3fd-bf59-4671-a526-d1d694513482.png">
</details>

After performing this action, you get the authentication token as an answer:

<details>
  <summary>Image Example</summary>
  <img src="https://user-images.githubusercontent.com/1509692/213528135-4fe59b90-8ddb-4ed5-bedb-296f4d6d7d03.png">
</details>

Copy the token, go to the top of the page, and click on the "Authorize" button.

<details>
  <summary>Image Example</summary>
  <img src="https://user-images.githubusercontent.com/1509692/213528495-da3b2c82-8eba-47d9-9c2e-89d8ade4ab90.png">
</details>

With this token, you can access other API calls, such as "/get_hello_world_auth" or edit/delete Categories, Suppliers etc...

## Database

The database used is sqlite3. You can use `SQLite Viewer` extension in the VSCode
