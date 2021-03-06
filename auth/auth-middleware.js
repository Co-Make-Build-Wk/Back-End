
module.exports = function auth() {
    return async (req, res, next) => {
        const authErr = {
            auth_message: 'Please log in or create account',
        };

        // express-session will automatically get the session ID from the cookie header
        // and check to make sure it's valid and the session for this user exists.

        try {
            if (!req.session || !req.session.user) {
                // if no session id || no session with a user
                return res.status(401).json(authErr);
            } else {
                next();
            };
        } catch (err) {
            console.log('Auth Session:', err);
            next(err);
        };
    }
};
