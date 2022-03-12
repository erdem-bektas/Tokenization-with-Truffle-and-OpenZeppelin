var ActAsAlwaysToken = artifacts.require("./ActAsAlwaysToken.sol");
var ActAsAlwaysTokenSale = artifacts.require("ActAsAlwaysTokenSale");

require("dotenv").config({ path: "../.env" });

module.exports = async function (deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(ActAsAlwaysToken, process.env.INITIAL_TOKENS);
  await deployer.deploy(
    ActAsAlwaysTokenSale,
    1,
    addr[0],
    ActAsAlwaysToken.address
  );
  let tokenInstance = await ActAsAlwaysToken.deployed();
  await tokenInstance.transfer(ActAsAlwaysTokenSale.address, process.env.INITIAL_TOKENS);
};
