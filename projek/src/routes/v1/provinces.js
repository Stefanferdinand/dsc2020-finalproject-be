const express = require('express');

const {getAllProvinces, insertProvinces, updateProvinces, deleteProvinces, getProvince} = require('../../controllers/v1/provinces');
const router = express.Router();

router.route('')
    .get(getAllProvinces)
    .post(insertProvinces)
    .put(updateProvinces)
    .delete(deleteProvinces)
    
router.route('/:id')
    .get(getProvince)


module.exports = router;