# https://geth.ethereum.org/docs/install-and-build/installing-geth
sudo add-apt-repository -y ppa:ethereum/ethereum;
sudo apt-get update;
sudo apt-get install ethereum;
npm install -g web3;

# Ganache (https://github.com/trufflesuite/ganache/releases/tag/v2.6.0-beta.3)
chmod 777 ganache-2.6.0-beta.3-linux-x86_64.AppImage;
./ganache-2.6.0-beta.3-linux-x86_64.AppImage;
sudo npm install -g ganache-cli;
ganachi-cli;