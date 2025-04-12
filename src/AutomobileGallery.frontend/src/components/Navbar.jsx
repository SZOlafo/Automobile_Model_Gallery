import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import logo from '../assets/logo.svg';

import '../css/Navbar.css';
import { Link } from 'react-router-dom';

function Navbar({ children }) {
    return (
        <>
            <AppBar id="navigation-bar">
                <Container>
                    <Toolbar id="middle" sx={{ position: 'relative', height: 100 }}>
                        <Link to='/' style={{ position: 'absolute' }}>
                            <img src={logo} alt="Logo" width={180} />
                        </Link>
                    </Toolbar>
                </Container>
            </AppBar>

            <main>
                {children}
            </main>
        </>
    );
}
export default Navbar;