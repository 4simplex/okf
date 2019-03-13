const ProductCode = require('../models/productCode');
const productCodeCtrl = {};

productCodeCtrl.findProductCode = function(code) {
    ProductCode.findOne({code: code}, 
        function(err, obj) {
            if(!obj){
                const productCode = new ProductCode();
                productCode.code = code;
                productCode.save();
                return false;
            } else {
                return true;
            }
        }
    );
}

module.exports = productCodeCtrl;