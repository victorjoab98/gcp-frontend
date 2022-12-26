import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid } from "semantic-ui-react";
import './Header.scss';
import RightHeader from './RightHeader/RightHeader';

export default function Header() {
  return (
    <div className="header">
        <Container>
            <Grid>
                <Grid.Column width={3} className="header__logo">
                    <Link to={'/'}>
                        <h1>MiPicz</h1>
                    </Link>
                </Grid.Column>
                <Grid.Column width={10} className="header__column">
                    <p>Search</p>
                </Grid.Column>
                <Grid.Column width={3} className="header__column">
                    <RightHeader/>
                </Grid.Column>
            </Grid>
        </Container>
    </div>
  );
}