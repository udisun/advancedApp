'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Doctor = mongoose.model('Doctor'),
	_ = require('lodash');

/**
 * Find doctor by id
 */
exports.doctor = function(req, res, next, id) {
	doctor.load(id, function(err, doctor) {
		if (err) return next(err);
		if (!doctor) return next(new Error('Failed to load doctor ' + id));
		req.doctor = doctor;
		next();
	});
};

exports.findBySpecialty = function(req, res, next) {
	console.log(req.params);
	Doctor.find({
		sub_speciality: req.params.doctorSpecialty
	}).sort('-created').exec(function(err, doctors) {
		if (err) {
			console.log(err);
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(doctors);
		}
	});
};

exports.getSpecialities = function(req, res, next) {
	res.jsonp([{
			title: 'a',
			id: 1
	},
		{
			title: 'b',
			id: 2
	},
		{
			title: 'c',
			id: 3
	},
		{
			title: 'd',
			id: 4
	},
		{
			title: 'e',
			id: 5
	},
		]);
};

exports.createAll = function(req, res) {

	var doctorsJSON = [{
			name: "ehud",
			speciality: 1,
			sub_speciality: 1
	},
		{
			name: "eyal",
			speciality: 1,
			sub_speciality: 2
	},
		{
			name: "idan",
			speciality: 1,
			sub_speciality: 3
	},
		{
			name: "shai",
			speciality: 1,
			sub_speciality: 4
	},
		{
			name: "michal",
			speciality: 1,
			sub_speciality: 5
	}];

	doctorsJSON.forEach(function(doctorJSON) {
		var doctor = new Doctor(doctorJSON);

		doctor.save(function(err) {});
	});

	res.jsonp(doctorsJSON);

};

/**
 * Create an doctor
 */
exports.create = function(req, res) {
	var doctor = new Doctor(req.body);
	doctor.user = req.user;

	doctor.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				doctor: doctor
			});
		} else {
			res.jsonp(doctor);
		}
	});
};

/**
 * Update an doctor
 */
exports.update = function(req, res) {
	var doctor = req.doctor;

	doctor = _.extend(doctor, req.body);

	doctor.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				doctor: doctor
			});
		} else {
			res.jsonp(doctor);
		}
	});
};

/**
 * Delete an doctor
 */
exports.destroy = function(req, res) {
	var doctor = req.doctor;

	doctor.remove(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				doctor: doctor
			});
		} else {
			res.jsonp(doctor);
		}
	});
};

/**
 * Show an doctor
 */
exports.show = function(req, res) {
	res.jsonp(req.doctor);
};

/**
 * List of doctors
 */
exports.all = function(req, res) {
	Doctor.find().sort('-created').exec(function(err, doctors) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(doctors);
		}
	});
};

exports.createDoctorForm = function(req, res, next) {
	res.render('addDoctor');
};