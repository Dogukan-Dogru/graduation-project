const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum_files/compiled_contracts/Factory.json');
const compiledDonate = require('../ethereum_files/compiled_contracts/Donate.json');

let accounts;
let factory;
let charityAddress;
let charity;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    /* accounts = await web3.eth.getAccounts().then(fetchedAccounts => {
        console.log(fetchedAccounts);
    }); */
    //console.log(accounts[3]);

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

    await factory.methods.createDonate('0x9642F3e3494f1a89dd460C9c230a64BbAE4512A5').send({
        from: accounts[0],
        gas: '1000000'
    });

    const organizators = await factory.methods.getOrganizations().call(); //[charityAddress]
    charityAddress = organizators[0];

    charity = await new web3.eth.Contract(JSON.parse(compiledDonate.interface), charityAddress);

});

describe('Charities', () => {
    it('deploys a factory and a organization', () => {
        assert.ok(factory.options.address);
        assert.ok(charity.options.address);
    });

    it('marks caller as the charity manager', async () => {
        const organizator = await charity.methods.organization().call();
        assert.equal(accounts[0],organizator);
    });

    it('somebody sends ether to charity wallet', async () => {
        const b_balance = await charity.methods.balance().call();
        
        const donate_ether = await charity.methods.donateEther()
        .send({ value: 10000000000000000, from: accounts[2] });

        const a_balance = await charity.methods.balance().call();
        assert.notEqual(b_balance,a_balance);
    });
});
