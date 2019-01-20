const validate = require('mongoose-validator');

const requires = name => validate({
    validator: (val => val),
    message: `${name} 不能为空`,
});

module.exports = {
    requires,
};
