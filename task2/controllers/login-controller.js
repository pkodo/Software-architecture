const dbName = require('./../index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = "users";

let password, login_credential;

const setData = (req) => {
    login_credential = req.body["email"];
    password = req.body["password"];
};

exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        res.locals.user = true;
        return next();
    } else {
    next();
    }
  };
//json example
/*{
    "email":"wanted email",
    "password":"password"
}*/
exports.login = (req, res) => {
    setData(req);
    dbName.db.collection(users).find({ $or: [ { username: login_credential }, { email: login_credential } ] }).
    toArray(function(err, result) {
        console.log(result);
        if (err) throw err;
        if(result.length <= 0) res.send("Wrong credentials");
        result = result[0];

        bcrypt.compare(password, result["password"], function(err, valid) {
            if(valid) {
                // Passwords match
                const token = jwt.sign(result, 'shhhhh');
                res.cookie('jwt', token);
                res.status(200).json({
                    status: 'success',
                    token,
                    data: {
                      result
                    }
                  });
            } else {
                // Passwords don't match
                res.status(500).send("Wrong credentials");
            }
        });
    });
};