
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('order_product').del()
    .then(function () {
      
      return knex('order_product').insert([
        {
          "product_id": 1,
          "order_id": 1,
          "unitPrice": 9.21,
          "quantity": 2
        },
        {
          "product_id": 2,
          "order_id": 1,
          "unitPrice": 19.21,
          "quantity": 1
        }
       ]);
       
    });
};
