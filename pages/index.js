import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum_files/factory.js';
import Layout from '../components/Layout.js';
import { Link } from '../routes';

class Index extends Component {
    static async getInitialProps()// server side compile olduğu için componentdidmount çalışmıyor bununla çekiyoruz initial değerleri
    {
        const organizations = await factory.methods.getOrganizations().call();

        return { organizations };
    }

    renderCharities() {
        const items = this.props.organizations.map((address) => {
            return {
                header: address,
                description:(
                    <Link route={`/transactions/${address}`}>
                        <a><Button content="Donate Now" color="violet"/></a>
                    </Link>
                    
                ),
                fluid: true,
            };
        });

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <div>
                    <h1>CHARITIES AND ORGANIZATIONS</h1>
                    {this.renderCharities()}  
                </div>
            </Layout>
                
        //return <div>{this.props.organizations[0]}</div>;
        );}
}

/* <Link route="/transactions/add_new_charity">
                        <a>
                            <Button content="Add Your Charity" color="violet"/>
                        </a>
                    </Link>
                     */

export default Index;