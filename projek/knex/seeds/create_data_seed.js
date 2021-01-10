
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('data_covid_indonesia').del()
    .then(function () {
      // Inserting data dummy 3 biji
      return knex('data_covid_indonesia').insert([
        {province_name: 'DKI Jakarta', recovered: 83338, death: 2120, positive: 98206, created_at: new Date()},
        {province_name: 'Jawa Timur', recovered: 43671, death: 3606, positive: 49801, created_at: new Date()},
        {province_name: 'Jawa Barat', recovered: 21371, death: 616, positive: 31907, created_at: new Date()}
      ]);

    });
};
