const User = require('./schemas/user');

const findById = async id => {
  return await User.findById(id);
};

const findByEmail = async email => {
  return await User.findOne({ email });
};

const findByVerifyToken = async token => {
  return await User.findOne({ verifyToken: token });
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

const updateAvatar = async (id, avatarUrl) => {
  return await User.findByIdAndUpdate({ _id: id }, avatarUrl, { new: true });
};

const updateVerifyToken = async (id, verify, verifyToken) => {
  return await User.updateOne({ _id: id }, { verify, verifyToken });
};

module.exports = {
  findById,
  findByEmail,
  findByVerifyToken,
  create,
  updateToken,
  getCurrent,
  updateSubscription,
  updateAvatar,
  updateVerifyToken,
};
