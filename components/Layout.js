import React from 'react';
import { Menu, Container, Icon, Popup, Grid } from 'semantic-ui-react'
import Head from 'next/head';
import { Link } from '../routes';




export default props => {
    return (
        <div>
            <Container>
            <Head><link async rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"/></Head>
            <Menu stackable inverted>
                <Link route="/">
                    <a className="item">
                        Charities and Organizations
                    </a>
                </Link>
                <Link route="/transactions/add_new_charity" position="right">
                    <a className="item">
                        Add Your Charity
                    </a>
                </Link>
            </Menu>

            {props.children}


            <Menu stackable color={'blue'} inverted widths={2}>
            <Menu.Item content="Yeditepe University CSE 492 Graduation Project - Doğukan Mert Doğru 20170702071"/></Menu>
            </Container>
            
        </div>
    );
};