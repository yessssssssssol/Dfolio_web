import crypto from "crypto";

module.exports = (password) => {
  const hash = crypto.createHash("sha1");
  hash.update(password);
  return hash.digest("hex");
};
