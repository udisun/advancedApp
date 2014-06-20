'use strict';

exports.render = function(req, res) {
    res.render('about', {
        user: req.user ? JSON.stringify(req.user) : 'null'
    });
};
