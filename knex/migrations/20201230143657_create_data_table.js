
exports.up = function(knex) {
    return knex.schema.createTable('data_covid_indonesia', (table) => {
        table.increments();
        table.string('province_name');
        table.integer('recovered');
        table.integer('death');
        table.integer('positive');
        table.timestamps();
        table.timestamp('deleted_at').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('data_covid_indonesia');
};
