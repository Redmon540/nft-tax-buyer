# nft_tax_buyer

## Installation Guide
Install dependencies with `npm install`.  

Add Network keys and Private keys in a file called `.env` to execute scripts (there is a sample file called `env`).  
You can get your own network keys through [alchemy](https://www.alchemy.com/). and private key through your metamask account.  

## Modify smart Contract with desired gas estimation variables. 
You can modify diferent variables for gasReturn as perc_fee, gasFee721 ...   
Contract located in `contracts/SmartContract.sol`.    
 
## Deployment
In order to deploy contract first modify `scripts/deploy.js` with desired variables.  
Make sure you know for sure you are using the right address for deployment, as it will set that address as vault on Smart contract and it will recieve all nfts. You can add different accounts in `hardhat.config.js`.  
Also, DEFAULT ETH TRANSFER TO CONTRACT IS 1 ETH feel free to change that as desired. Contract will need eth to transfer gasReturns and RewardsxTx.   

Then deploy with: `npx hardhat run scripts/deploy.js --network DESIRED NETWORK`.  
It is highly recommended that you deploy the contract first on a testnet first for testin as rinkeby or ropsten.  
`Ex: npx hardhat run scripts/deploy.js --network rinkeby`  
`Ex: npx hardhat run scripts/deploy.js --network mainnet`  
To add more networks configure file `hardhat.config.json`  

## Verify in Etherscan
Once the contract is deployed there's a script to verify contract on etherscan.  
1. Get a etherscan private api key in [etherscan.io](https://etherscan.io/).  
2. Add etherscan api key to the `.env` file as `ETHERSCAN_API= your_api`.   
3. Execute script `npx hardhat etherscan --address ADDRESS_OF_DEPLOYED_CONTRACT --network NETWORK`.    
Sometimes etherscan will not verify contract if there is not enough transaction.  

## Scripts
There are several scripts included for gas estimation and testing.  
Execute scrips with `npx hardhat run scripts/gasEstimation.js`.  

## Tests 
Run tests to make sure everything gets executed as desired.  
Execute tests with `npx hardhat tests`.
 
## Website Front-end
1. In order to launch the website change to the `client/` folder.
2. Run `npm install` inside `client` folder.
3. Open the file located in `src/components/Main/Main.jsx` to edit the smart contract address to interact with.   
In order to properly connect to your custom contract you will have to edit that last file and add
your contract address to:  
`const recieverContract = "YOUR_CONTRACT_ADDRESS";`  
4. Finnally to run website on localhost execute `npm run start`. 
