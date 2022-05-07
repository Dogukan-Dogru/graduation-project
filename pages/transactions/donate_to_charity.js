import React, { Component } from 'react';
import Layout from '../../components/Layout'
import Donate from '../../ethereum_files/donate';
import web3 from '../../ethereum_files/web3';
import { Router } from '../../routes';
import { Form,Button,Input, Message } from 'semantic-ui-react';

class donateCharity extends Component {

    state = {
        value: "",
        error: "",
        adr: "",
        tryingToAdd: false,
    };

    static async getInitialProps(props)
    {
        const charity = Donate(props.query.address);

        const rly_wallet = await charity.methods.getAdr().call();

        //this.setState({adr: rly_wallet});

        return { charity };
    }


    renderAdr() {
            return (
                    <h2>
                        Donating to {this.state.adr}
                    </h2>
                    
            );
    }
/*     renderWallet() {


    } */
    
    onSubmit = async (event) => {

        event.preventDefault();

        //this.props.organizations.map((address)

        this.setState({loading: true, error: ""});

        try {
            const accounts = await web3.eth.getAccounts();

            await this.props.charity.methods.donateEther().send({ 
                value: web3.utils.toWei(this.state.value, 'ether'), 
                from: accounts[0]}
            );

            Router.pushRoute('/');

        } catch (err) {
            this.setState({ error: err.message });
        }

        this.setState({loading: false});
    };

    /* static async getInitialProps(props) 
    {
        const charity = Donate(props.query.address);

        const rly_wallet = await charity.methods.getAdr().call();

        return {};
    } */

    
    render() {
        return (
            <Layout>
                <h2>Donating</h2>
                <Form onSubmit={this.onSubmit} error={!!this.state.error}>
                    <Form.Field>
                        <label>Enter the Amount of Ethereum</label>
                        <p>Example .01</p>
                        <Input placeholder="Ethereum" value={this.state.value} onChange={(event) => this.setState({value: event.target.value})} />
                    </Form.Field>  
                    <Message error header="Error Occured" content={this.state.error} /> 
                    <Button loading={this.state.loading} color="violet" type='submit'>Submit</Button>
                </Form>
            </Layout>
            
        );
    }
}

export default donateCharity;