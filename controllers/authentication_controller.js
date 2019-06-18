const UserModel = require("./../database/models/user_model");

function registerNew(req, res) {
    res.render("authentication/register");
}

async function register(req, res) {
    const { email, password } = req.body;
    const user = await UserModel.create({ email, password });
    // save the log in information of in session, which is stored in cookie;
    req.session.user = user;
    res.redirect("/dashboard");
}

function logout(req, res) {
    req.session.destroy(() => {
        res.redirect("/");
    });
}

function loginNew(req, res) {
    res.render("authentication/login"); 
}

async function login(req,res) {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    const valid = user ? await user.verifyPassword(password) : null;
    if (user && valid) {
        req.session.user = user;
        return res.redirect("/dashboard")
    }
    return res.send("sorry, incorrect")
}

module.exports = {
    registerNew,
    register,
    logout,
    loginNew,
    login
}