const CONTRACT_NAME =
  // process.env.CONTRACT_NAME || "dev-1643565458345-58299177709187";
  process.env.CONTRACT_NAME || "vg2.macedotrashcan.testnet";

function getConfig(env) {
  switch (env) {
    case "development":
    case "testnet":
      return {
        networkId: "testnet",
        nodeUrl: "https://rpc.testnet.near.org",
        contractName: CONTRACT_NAME,
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
      };
    default:
      throw Error(
        `Unconfigured environment '${env}'. Can be configured in src/config.js.`
      );
  }
}

module.exports = getConfig;
