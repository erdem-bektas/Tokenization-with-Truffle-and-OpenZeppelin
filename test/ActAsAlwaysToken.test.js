require("dotenv").config({ path: "../.env" });

const Token = artifacts.require("ActAsAlwaysToken");

const chai = require("./setupchai");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("Token Test", async (accounts) => {
  const [initialHolder, recipient, anotherAccount] = accounts;

  beforeEach(async () => {
    this.ActAsAlwaysToken = await Token.new(process.env.INITIAL_TOKENS);
  });

  it("All tokens should be in my account", async () => {
    let instance = this.ActAsAlwaysToken;
    let totalSupply = await instance.totalSupply();
    //old style:
    //let balance = await instance.balanceOf.call(initialHolder);
    //assert.equal(balance.valueOf(), 0, "Account 1 has a balance");
    //condensed, easier readable style:
    return await expect(
      instance.balanceOf(initialHolder)
    ).to.eventually.be.a.bignumber.equal(totalSupply);
  });

  it("is possible to send tokens between accounts", async () => {
    const sendTokens = 1;
    let instance = this.ActAsAlwaysToken;
    let totalSupply = await instance.totalSupply();
    await expect(
      instance.balanceOf(initialHolder)
    ).to.eventually.be.a.bignumber.equal(totalSupply);
    await expect(instance.transfer(recipient, sendTokens)).to.eventually.be
      .fulfilled;
    await expect(
      instance.balanceOf(initialHolder)
    ).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
    return await expect(
      instance.balanceOf(recipient)
    ).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
  });

  it("is not possible to send more tokens than avaible in total", async () => {
    let instance = this.ActAsAlwaysToken;
    let balanceOfAccount = await instance.balanceOf(initialHolder);

    await expect(instance.transfer(recipient, new BN(balanceOfAccount + 1))).to
      .eventually.be.rejected;
    return await expect(
      instance.balanceOf(initialHolder)
    ).to.eventually.be.a.bignumber.equal(balanceOfAccount);
  });
});
