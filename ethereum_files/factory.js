import web3 from "./web3";

import Factory from './compiled_contracts/Factory.json';

const contract = new web3.eth.Contract(JSON.parse(Factory.interface),'0x7aC5c8C8c6Aee82c84F90659A847DCbA847af7E8');

export default contract;