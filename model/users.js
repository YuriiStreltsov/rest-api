const User = require('./schemas/user');

const findById = async id => {
  return await User.findById(id);
};

const findByEmail = async email => {
  return await User.findOne({ email });
};

const create = async userOptions => {
  const newUser = new User(userOptions);
  return await newUser.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const getCurrent = async id => {
  return await User.findById(id);
};

const updateSubscription = async (id, body) => {
  return await User.findByIdAndUpdate({ _id: id }, body, { new: true });
};

const updateAvatar = async (id, body) => {
  return await User.findByIdAndUpdate({ _id: id }, body, { new: true });
};

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  getCurrent,
  updateSubscription,
  updateAvatar,
};
