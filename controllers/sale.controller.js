const Sale = require('../models/sale');
const saleCtrl = {};

saleCtrl.createSale = async (req, res) => {
  const sale = new Sale(req.body);
  await sale.save();
  res.json({status: 'Venta realizada'});
};

saleCtrl.getSales = async (req, res) => {
  console.log(req.params.firstDate);
  console.log(req.params.secondDate);
  const sales = await Sale.find({
    saleDate: {
      $gte: req.params.firstDate,
      $lte: req.params.secondDate,
    },
  });

  res.json(sales);
};

module.exports = saleCtrl;
