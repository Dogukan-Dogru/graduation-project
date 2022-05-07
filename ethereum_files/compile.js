const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const compiled_contracts_path = path.resolve(__dirname,'compiled_contracts');
fs.removeSync(compiled_contracts_path);

const donationPath = path.resolve(__dirname, 'contracts', 'donation.sol');
const source = fs.readFileSync(donationPath,'utf8');
const output = solc.compile(source, 1).contracts; //contain two seperate object

fs.ensureDirSync(compiled_contracts_path);


console.log(output);
for(let contract in output)
{
    fs.outputJSONSync(
        path.resolve(compiled_contracts_path, contract.replace(':','') + '.json'),
        output[contract]
    );
}