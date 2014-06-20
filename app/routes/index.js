'use strict';

module.exports = function(app) {

    // Home route
    var index = require('../controllers/index');
    app.get('/', index.render);
    var about = require('../controllers/about');
    app.get('/about', about.render);
   

    //Should post client side json info to the server


};