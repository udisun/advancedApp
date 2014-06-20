'use strict';

// Articles routes use articles controller
var doctors = require('../controllers/doctors');

module.exports = function(app) {

  app.get('/doctors', doctors.all);
  app.get('/doctors/specialities', doctors.getSpecialities);
  app.get('/doctors/speciality/:doctorSpecialty', doctors.findBySpecialty);
  app.get('/doctors/createAll', doctors.createAll);


  app.get('/doctors/admin/add', doctors.createDoctorForm);
};