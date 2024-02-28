import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from '@inertiajs/inertia-react';
import Button from './Button';
import { t } from 'i18next';
import Dropdown from './Dropdown';

const NavWrapper = styled.nav`
    background: var(--mainBlue);
    .nav-link {
        color: var(--mainWhite) !important;
        font-size: 1.3rem;
        text-transform: capitalize !important;
    }
`;

const Navbar = ({ auth }) => {
    console.log(auth);
    // const { user } = auth;
    return (
        <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5 flex justify-content-between">
            <Link href="/">
                {/* <img src={logo} alt="store" className="navbar-brand" /> */}
            </Link>
            <ul className="navbar-nav align-items-center">
                <li className="nav-item ml-5">
                    <Link href={route('cakes.index')} className="nav-link">
                        {t('Cake Types')}
                    </Link>
                </li>

                <li className="nav-item ml-5">
                    <Link href={route('cakes.index')} className="nav-link">
                        {t('Cakes')}
                    </Link>
                </li>
            </ul>

            {auth.user ? (
                <Dropdown>
                    <Dropdown.Trigger>
                        <span className="inline-flex rounded-md">
                            <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                            >
                                {auth.user.name}

                                <svg
                                    className="ml-2 -mr-0.5 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        <Dropdown.Link href="/cart">
                            <Button>
                                <span className="mr-2">
                                    <i className="fas fa-cart-plus"></i>
                                </span>
                                My Cart
                            </Button>
                        </Dropdown.Link>
                        <Dropdown.Link
                            href={route('logout')}
                            method="post"
                            as="button"
                        >
                            {t('Logout')}
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            ) : (
                <>
                    <Link href={route('login')}>{t('Login')}</Link>
                </>
            )}
        </NavWrapper>
    );
};

export default Navbar;
