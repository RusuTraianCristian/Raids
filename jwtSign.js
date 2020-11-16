exports.signJwt = async (event) => {
    const jwt = require('jsonwebtoken');

    const secret = 'MBnRcsINvycQCgm8K7rB4OV16eA9z3IeGcPthVshAwQ=';
    const payload = {
        "exp": 1502646259,
        "user_id": "userIDhereNUMBERasString",
        "role": "external"
    };
    const token = jwt.sign({ payload }, secret);
    return token;
};
