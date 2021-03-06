const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    // register new user accounts
    register: (req, res) => {
        const user = new User(req.body);
        console.log(user);
        user.save()
            .then(() => {
                console.log("successfully registered");
                res.json({ message: "Successfully registered!", user: user})
            })
            .catch((err) => {
                console.log("register not successful!");
                res.status(400).json(err);
            });
    },
    // login
    login: (req, res) => {
        User.findOne({email: req.body.email})
            .then((userRecord) => {
                if(userRecord === null) {
                    res.status(400).json({ message: "Invalid login Attempt 1" })
                } else {
                    bcrypt.compare(req.body.password, userRecord.password)
                        .then((passwordValid) => {
                            if(passwordValid) {
                                console.log("Password is valid");
                                res.cookie("usertoken", jwt.sign({
                                    _id: userRecord._id,
                                    username: userRecord.username
                                }, process.env.JWT_SECRET), {
                                    httpOnly: true,
                                    expires: new Date(Date.now() + 900000000)
                                }).json({
                                    message: "Successfully Logged In",
                                    userLoggedIn: {
                                        username: userRecord.username
                                    }
                                })
                            } else {
                                res.status(400).json({ message: "Invalid Login Attempt 2"})
                            }
                        })
                        .catch(err => {
                            res.status(400).json({ message: "Invalid Login Attempt 3"});
                        })
                }
            })
            .catch(err => {
                res.status(400).json({ message: "Invalid Login Attempt 4"})
            })
    },
    logout: (req, res) => {
        console.log("logged out!");
        res.clearCookie("usertoken");
        res.json({ message: "You have successfully logged out!"});
    }
}
