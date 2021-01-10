
const knex = require('../../config/db_knex')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

const getAllProvinces = async (req, res) => {

    try{
        const knex_query = await knex('data_covid_indonesia').select('id', 'province_name', 'recovered', 'death', 'positive').whereNull('deleted_at');
       
        //hateoas
        knex_query.forEach(element => {
            let url = {url: req.originalUrl + '/' + element['id']};
            Object.assign(element, url);
            delete element['id'];
        });

        //success
        if(knex_query !== undefined){
            res.send(
                {
                    status: true, 
                    totalData: knex_query.length,
                    message: 'fetching data success',
                    data: knex_query,
                }
            );
        }
    }
    //gagal
    catch(error){
        res.send({status: false, message: 'Fetching data failed'});
    }
}

const insertProvinces = async (req, res) => {
    
    try {
        const {province_name, recovered, death, positive} = req.body;

        // gagal kalau ada salah satu data yang gak di-input
        if(province_name === undefined || recovered === undefined || death === undefined || positive === undefined){
            res.send({status: false, message: 'Storing data failed', reason: 'Invalid data'});
        }
        // success
        else{
            const knex_query = await knex('data_covid_indonesia').insert({province_name, recovered, death, positive, created_at: new Date()});
            res.send(
                {
                    status: true,
                    message: 'Storing data success',
                    stored: {
                        name: province_name,
                        recovered: recovered,
                        death: death,
                        positive: positive
                    }
                }
            );
        };
    } 
    //gagal
    catch (error) {
        res.send({status: false, message: 'Storing data failed'});
    }
}

const updateProvinces = async (req, res) => {
    
    try {
        const {id, province_name, recovered, death, positive} = req.body;

        // gagal kalau ada salah satu data yang gak di-input
        if(id === undefined || province_name === undefined || recovered === undefined || death === undefined || positive === undefined){
            res.send({status: false, message: 'Updating data failed', reason: 'Invalid data'});
        }
        else{

            const check_query = await knex('data_covid_indonesia').select('*').where('id', '=', id).whereNull('deleted_at');
            // gagal id not found
            if(check_query.length == 0){
                res.send({status: false, message: 'Id not found'});
            }
            // success
            else{
                
                let result = {
                    status: true,
                    message: 'Updating data success',
                }

                const before_query = await knex('data_covid_indonesia').select('province_name', 'recovered', 'death', 'positive').where('id', '=', id);
                
                result['before'] = before_query;
                
                const update_query = await knex('data_covid_indonesia').where('id', '=', id).update({province_name, recovered, death, positive, updated_at: new Date()});
                
                const after_query = await knex('data_covid_indonesia').select('province_name', 'recovered', 'death', 'positive').where('id', '=', id);
                
                result['after'] = after_query;

                res.send(result);
            }

        }
    } 
    // gagal
    catch (error) {
        res.send({status: false, message: 'Updating data failed'});
    }
}

const deleteProvinces = async (req, res) => {
   
    try {
        const {id} = req.body;

        // gagal kalau ada data yang gak di-input
        if(id === undefined){
            res.send({status: false, message: 'Destroy data failed', reason: 'Invalid data'});
        }
        else{

            const check_query = await knex('data_covid_indonesia').select('*').where('id', '=', id).whereNull('deleted_at');

            // gagal id not found
            if(check_query.length == 0){
                res.send({status: false, message: 'Id not found'});
            }
            else{

                const knex_query = await knex('data_covid_indonesia').where('id', '=', id).update({deleted_at: new Date()});
                const get_query = await knex('data_covid_indonesia').select('province_name', 'recovered', 'death', 'positive').where('id', '=', id);

                res.send(
                    {
                        status: true,
                        message: 'Destroy data success',
                        stored: get_query
                    }
                );
            }
        }
    } 
    catch (error) {
        res.send({status: false, message: 'Destroy data failed'});
    }
}

const getProvince = async (req, res) => {
    
    try{

        const {id} = req.params;
        const knex_query = await knex('data_covid_indonesia').select('province_name', 'recovered', 'death', 'positive').whereNull('deleted_at').where('id', '=', id);

        //gagal
        if(knex_query.length == 0){
            res.send({status: false, message: 'Id not found'});
        }
        //success
        else if(knex_query !== undefined){
            res.send(
                {
                    status: true,
                    stored: knex_query
                }
            );
        }
    }
    catch(error){
        res.send({status: false, message: 'Id not found'});
    }
}

module.exports = {
    getAllProvinces,
    insertProvinces,
    updateProvinces,
    deleteProvinces,
    getProvince
}