const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempDir, originalname } = req.file;
  const { _id } = req.user;
  const [extention] = originalname.split(".").reverse();

  const newName = `${_id}.${extention}`;
  const resultDir = path.join(avatarsDir, newName);
  await fs.rename(tempDir, resultDir);

  const avatar = await Jimp.read(resultDir);
  const avatarResize = await avatar.resize(250, 250);
  await avatarResize.write(resultDir);

  const avatarURL = path.join("avatars", newName);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.status(200).json({
    avatarURL,
  });
};

module.exports = updateAvatar;
