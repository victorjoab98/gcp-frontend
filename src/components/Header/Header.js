import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid } from "semantic-ui-react";
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { logoutThunk } from '../../store/AuthSlice/authThunks';
import './Header.scss';
import RightHeader from './RightHeader';

export default function Header() {

  const dispatch = useAppDispatch()

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
                </Grid.Column>
                <Grid.Column width={1} className="header__column">
                    <RightHeader/>
                </Grid.Column>
                <Grid.Column width={2} className="header__column">
                    <Button onClick={ ()=>dispatch( logoutThunk())}>Cerrar Sesion</Button>
                </Grid.Column>
                
            </Grid>
        </Container>
    </div>
  );
}