const UniversityModel = require('../models/university');

exports.getUniversities = (req, res, next) => {

    UniversityModel.find()
        .then(universities => {

            universities.password = undefined;

            return res.status(201).json(
                {
                    status: "OK",
                    result: {
                        data: {
                            universities
                        }
                    }
                }
            );
        })
        .catch(error => {
            console.log(error);
        });

}