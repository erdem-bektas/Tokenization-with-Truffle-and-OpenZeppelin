var ActAsAlwaysToken = artifacts.require("./ActAsAlwaysToken.sol");
var ActAsAlwaysTokenSale = artifacts.require("./ActAsAlwaysTokenSale");
var KycContract = artifacts.require("./KycContract");

require("dotenv").config({ path: "../.env" });

module.exports = async function (deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(ActAsAlwaysToken, process.env.INITIAL_TOKENS);
  await deployer.deploy(KycContract);
  await deployer.deploy(ActAsAlwaysTokenSale, addr[0], ActAsAlwaysToken.address, KycContract.address);
  let tokenInstance = await ActAsAlwaysToken.deployed();
  await tokenInstance.transfer(
    ActAsAlwaysTokenSale.address,
    process.env.INITIAL_TOKENS
  );
};
