var fs = require("fs");

module.exports.loadFixture = function(fixtureName) {
  return fs.readFileSync("test/fixtures/" + fixtureName + ".js").toString();
};

