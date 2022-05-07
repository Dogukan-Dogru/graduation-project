pragma solidity ^0.4.17;

contract Factory {
    address[] public deployedCharities;

    function createDonate(address adr) public {
        address newDonate = new Donate(msg.sender,adr);

        deployedCharities.push(newDonate);
    }
    function getOrganizations() public view returns(address[])
    {
        return deployedCharities;
    }
}

contract Donate {
    address public organization;
    address public organization_wallet; // 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2

    function Donate(address creator,address wallet) public payable{
        organization = creator;
        organization_wallet = wallet;
    }

    function balance() public view returns(uint) {

        return address(organization_wallet).balance;
    }

    function donateEther() public payable { //external
        //require(msg.value > .01 ether);
        organization_wallet.transfer(msg.value);
    }

    function getAdr() public view returns(address)
    {
        return organization_wallet;
    }

}