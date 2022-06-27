const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
    //http://127.0.0.1:7545
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545")
    const wallet = new ethers.Wallet(
        "de4a7cfa3de06ed368de92cbc872bb152b8d9a05ecf0e0c1295d9a931e1ba623", 
        provider
    );
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("deploying...");
    const contract = await contractFactory.deploy();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
});