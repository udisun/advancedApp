'use strict';

module.exports = function(app) {

    // Home route
    var elastic = require('../controllers/elastic');
    app.get('/elastic', elastic.experience);

    var elastic = require('../controllers/elastic');
    app.get('/elastic_sub', elastic.subExperience);
   

    //Should post client side json info to the server


};