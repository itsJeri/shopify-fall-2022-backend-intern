# Welcome!

This application is designed for Shopify's Fall 2022 Backend Developer Intern Challenge.

DEMO: https://youtu.be/Xj2JkVjOI7w

## Requirements

Build an inventory tracking web application for a logistics company.

Basic CRUD Functionality:
- Create Inventory Items
- Edit Items
- Delete Items
- View a list of Items

Additional Functionalities:
- Ability to create warehouses/locations and assign inventory to specific locations

## Installation

Requirements:
- Ruby 2.7.4
- NodeJS (v16) and npm
- PostgreSQL

#### Install latest versions of `bundler` and `rails`.

```
$ gem install bundler
$ gem install rails
```

#### If your Node is not updated

```
$ npm i -g npm
```

#### PostgreSQL installation for WSL

```
$ sudo apt update
$ sudo apt install postgresql postgresql-contrib libpq-dev
```

Confirm Postgres was installed successfully:
```
$ psql --version
```

Run this command to start Postgres service:
```
$ sudo service postgresql start
```

If you ever get stuck: https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-postgresql

#### PostgreSQL installation for OSX

Use Homebrew:
```
$ brew install postgresql
```

Run this command to start Postgres service:
```
$ brew services start postgresql
```

#### Execute:
```
$ bundle i
$ rails db:create
$ rails db:migrate db:seed
$ npm i --prefix client
```

## Local Initialization

Run in root directory to initialize API: `$ rails s`

Run in a separate terminal, also in root directory, to initialize client: `$ npm start --prefix client`

Go to `http://localhost:4000/` in your web browser to view the application

# Usage and Features

This app is created using Ruby on Rails, Active Record, Active Model Serializer (AMS), and PostgreSQL. This application is configured to be deployment-ready on Heroku and can easily be modified to include user sessions/logins and cookies if needed.

## Database

The database contains an `items` table and a `warehouses` table in a one-to-many relationship. The `items` table houses the foreign key column, as well as a `:name`, and `:description`. The `warehouses` table holds a `:name`, `:street`, `:city`, and `:country`.

The citext extension was used during migration and generation of `Warehouse` resources to enable case-insensitive unique warehouse names.

## Models, Controllers, Routes, and Serializers

Through Object Relational Mapping (ORM) and Active Record's nature of convention over configuration, all models are easily set up with validations and associations to perform database operations in an object-oriented fashion. The `Item` model has a class method that sorts itself based on the date the data was created.

Each controller holds a private method to permit specified parameters for CRUD actions. The controllers all inherit from the ApplicationController, allowing all subclasses performing CRUD that raises an exception to be rescued with HTTP response 422. The error messages are then rendered in an array as json and can be utilized in the frontend.

Routes are specified to promote a safer API and limit CRUD actions to only the ones necessary. There is also a fallback setup to render `public/index.html` (through FallbackController) to differentiate non-API requests, such as React Router.

`Items` are serialized to display its `:id`, `:name`, `:description`, and the `:warehouse` it resides in. `Warehouses` are serialized to display all of its columns and an `:items_count` that returns the number of items that are joined with the specific warehouse instance in the response.

# Future Implementations

To scale this application and handle large amounts of inventory, I would refactor my database and associations to have a many-to-many relationship between `Items` and `Warehouses`. This would allow the app to only hold one of each `Item` and `Warehouse` and use the join table to track the number of items within a specified warehouse. 

For example, when an item is created and added to a warehouse, it would create the join and increment the integer value of the join table's `:quantity` column by however many the user specifies. When items are moved from one warehouse to another, it would decrement from the current item-warehouse join row and increment the destination's item-warehouse join row by the same amount.

This enables the app to not have to store thousands of repeated datapoints, vastly reducing query times and even client-facing user experience times.

I was heading this direction in the first couple of hours, but pivoted as I was afraid I would run out of time since I only discovered this internship opportunity with less than 24 hours before deadline.

I also thought about adding the functionality to view specific warehouse's items in isolation, but I quickly realized that since the requirements demand a place to view a list of all items that this feature would be more optimal to build while manipulating the data that's already there on the frontend.

# THANK YOU!

Thank you for taking the time to consider my application! 😊