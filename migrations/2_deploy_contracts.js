var ActAsAlwaysToken = artifacts.require("./ActAsAlwaysToken.sol");

module.exports = async function(deployer) {
  await deployer.deploy(ActAsAlwaysToken,618);
};
