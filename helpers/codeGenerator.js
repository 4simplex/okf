const codeGenerator = {};

codeGenerator.generateProductCode = function() {
  let code = '';
  let possible = 'ABCDEFGHJKMNPQRSTUVWXYZ';

  for (let i = 0; i < 4; i++) {
    code += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  possible = '0123456789';

  for (let i = 0; i < 4; i++) {
    code += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return code;
};

module.exports = codeGenerator;
