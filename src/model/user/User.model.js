const { permittedCrossDomainPolicies } = require("helmet");
const { UserSchema } = require("./User.schema");

//insert new users and save
const insertUser = (userObj) => {
    return new Promise((resolve, reject) => {
        UserSchema(userObj)
            .save()
            .then(data => resolve(data))
            .catch(error => reject(error));
    })
};

module.exports = {
    insertUser,
};