const StringUtil = require('../../utilities/string-util');
const User = require('../../model/user-model');
const JWT = require('../../services/auth-service');

async function index(req, res) {
    const validation = validateIndex(req.body);
    if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
    }

    User.find({ username: req.body.username.toLowerCase() }, (error, user) => {
        if (error) {
            return res.status(500).json();
        }

        if (!user) {
            return res.status(401).json();
        }

        const passwordMatch = User.passwordMatch(req.body.password, user[0].password);
        if (!passwordMatch) {
            return res.status(401).json();
        }

        const token = JWT.generateJWT(user);
        return res.status(200).json({ token: token });
    });
}

function validateIndex(body) {
    let errors = '';

    if (StringUtil.isEmpty(body.username)) {
        errors += 'Username is required. ';
    }

    if (StringUtil.isEmpty(body.password)) {
        errors += 'Password is required. ';
    }

    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}

module.exports = {
    index,
    validateIndex
};