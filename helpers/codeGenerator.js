const codeGenerator = {};

codeGenerator.generateProductCode = function () {
        var code = "";
        var possible = "ABCDEFGHJKMNPQRSTUVWXYZ";
      
        for (var i = 0; i < 4; i++)
          code += possible.charAt(Math.floor(Math.random() * possible.length));
      
        possible = "0123456789";
    
        for (var i = 0; i < 4; i++)
            code += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return code;
}

module.exports = codeGenerator;