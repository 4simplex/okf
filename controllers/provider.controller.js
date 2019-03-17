const Provider = require('../models/provider');
const Price = require('../models/price');
const providerCtrl = {};


providerCtrl.getProviders = async (req, res) => {
  const providers = await Provider.find();
  res.json(providers);
};

providerCtrl.createProvider = async (req, res) => {
  const provider = new Provider(req.body);
  await provider.save();
  res.json(provider);
};

providerCtrl.getProvider = async (req, res) => {
  const provider = await providerCtrl.getProviderBy(req, res);
  res.json(provider);
};

providerCtrl.editProvider = async (req, res) => {
  const provider = {
    name: req.body.name,
    info: req.body.info,
  };
  await Provider.findByIdAndUpdate(req.params.id, {$set: provider});

  await Price.updateMany({'provider._id': req.body._id}, {$set: {'provider.name': req.body.name}});

  res.json({status: 'Provider updated'});
};

providerCtrl.deleteProvider = async (req, res) => {
  await Provider.findByIdAndRemove(req.params.id);
  res.json({status: 'Provider deleted'});
};

providerCtrl.getProviderBy = async (req, res) => {
  if ((req.params.id != 'noId' && req.params.name != null) || req.params.name != null) {
    return Provider.findOne({name: {$regex: new RegExp('^' + req.params.name + '$', 'i')}});
  }

  if (req.params.id != 'noId') {
    return Provider.findById(req.params.id);
  }
};

module.exports = providerCtrl;
