import React, { Component } from "react";
import Layout from '../../components/Layout';
import { Form,Button,Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum_files/factory';
import web3 from '../../ethereum_files/web3';
import { Router } from '../../routes';

class newCharity extends Component {

    state = {
        adr: "",
        error: "",
        tryingToAdd: false,
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading: true, error: ""});

        try {
            const accounts = await web3.eth.getAccounts();

            await factory.methods.createDonate(this.state.adr).send({from: accounts[0]});

            Router.pushRoute('/');

        } catch (err) {
            this.setState({ error: err.message });
        }

        this.setState({loading: false});
    };

    render() {
        return(
            <Layout>
                <h2>Add New Charity</h2>
                <Form onSubmit={this.onSubmit} error={!!this.state.error}>
                    <Form.Field>
                        <label>Enter Your Charity/Organization Wallet</label>
                        <Input placeholder="Wallet Address" value={this.state.adr} onChange={(event) => this.setState({adr: event.target.value})} />
                    </Form.Field>  
                    <Message error header="Error Occured" content={this.state.error} /> 
                    <Button loading={this.state.loading} color="violet" type='submit'>Submit</Button>
                </Form>
            </Layout>
            
        ); 
    }
}

export default newCharity;