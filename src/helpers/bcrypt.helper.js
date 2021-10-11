const bcrypt = require('bcrypt');
const saltRounds = 10;

//hash the plain password
const hashPassword = plainPassword => {
    return new Promise(resolve => {
        resolve(bcrypt.hashSync(plainPassword, saltRounds));
    });
}

//compare the password with the one on db
const comparePassword = (plainPass, passFromDb) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPass, passFromDb, function(err, result) {
            if (err) reject(err);

            resolve(result);
        });
    });
};

module.exports = {
    hashPassword,
    comparePassword,
}