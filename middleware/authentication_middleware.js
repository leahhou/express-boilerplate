function authRedirect(req, res, next) {
    if (req.session && req.session.user) {
        return res.redirect("/dashboard");
    }

    return next();
}

module.exports = {
    authRedirect
}