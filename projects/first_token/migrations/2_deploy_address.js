var SampleToken = artifacts.require("SampleToken")

module.exports = (deployer) => {
  deployer.deploy(SampleToken, "FlandersToken", "FLAN", 1000);
}