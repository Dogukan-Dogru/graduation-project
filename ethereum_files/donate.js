import web3 from './web3';
import Donate from './compiled_contracts/Donate.json';

export default (address) => {
    //console.log("donate.js " + address);
    return new web3.eth.Contract(JSON.parse(Donate.interface),address);
};