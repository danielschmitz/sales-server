

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {
          "description": "Sweet and savory sauces relishes spreads and seasonings",
          "name": "Condiments"
        },
        {
          "description": "Soft drinks coffees teas beers and ales",
          "name": "Beverages"
        },
        {
          "description": "Desserts candies and sweet breads",
          "name": "Confections"
        },
        {
          "description": "Cheeses",
          "name": "Dairy Products"
        },
        {
          "description": "Breads crackers pasta and cereal",
          "name": "Grains/Cereals"
        },
        {
          "description": "Prepared meats",
          "name": "Meat/Poultry"
        },
        {
          "description": "Dried fruit and bean curd",
          "name": "Produce"
        },
        {
          "description": "Seaweed and fish",
          "name": "Seafood"
        }
      ]);
    });
};