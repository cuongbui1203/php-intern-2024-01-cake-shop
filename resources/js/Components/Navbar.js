import React from 'react';
import styled from 'styled-components';
import { Link } from '@inertiajs/inertia-react';
import { Button } from 'antd';
import Dropdown from './Dropdown';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { ROLE } from '@/const/role';
import axios from 'axios';
import i18n from '@/i18n';

const NavWrapper = styled.nav`
    background: var(--mainBlue);
    .nav-link {
        color: var(--mainWhite) !important;
        font-size: 1.3rem;
        text-transform: capitalize !important;
    }
`;

const Navbar = ({ auth }) => {
    const [t] = useTranslation();
    const roleId = auth.user != null ? auth.user.role_id : ROLE.USER;
    const handelLogout = async () => {
        const res = await axios.post(route('logout'), {
            headers: {
                'X-localization': i18n.language
            }
        });
        location.pathname = '/';
    };
    return (
        <>
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5 flex justify-content-between">
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item ml-5">
                        <Link
                            href={route('cake-types.index')}
                            className="nav-link"
                        >
                            {t('Cake Types')}
                        </Link>
                    </li>

                    <li className="nav-item ml-5">
                        <Link href={route('landing')} className="nav-link">
                            {t('Cakes')}
                        </Link>
                    </li>
                    {roleId == ROLE.ADMIN ? (
                        <>
                            <li className="nav-item ml-5">
                                <Link
                                    href={route('admin.cakes.index')}
                                    className="nav-link"
                                >
                                    {t('CakeAdmin')}
                                </Link>
                            </li>
                            <li className="nav-item ml-5">
                                <Link
                                    href={route('admin.users.index')}
                                    className="nav-link"
                                >
                                    {t('ListAccount')}
                                </Link>
                            </li>
                        </>
                    ) : (
                        <></>
                    )}
                </ul>
                <LanguageSwitcher />
                {auth?.user ? (
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
                            <div className="d-flex justify-content-center m-2">
                                <Link
                                    href={route('users.show', {
                                        user: auth.user.id
                                    })}
                                >
                                    <Button>{t('Account')}</Button>
                                </Link>
                            </div>
                            <div className="d-flex justify-content-center m-2">
                                <Button>
                                    <span className="mr-2">
                                        <i className="fas fa-cart-plus"></i>
                                    </span>
                                    {t('MyCart')}
                                </Button>
                            </div>
                            <div className="d-flex justify-content-center m-2">
                                <Button onClick={handelLogout}>
                                    {t('Logout')}
                                </Button>
                            </div>
                        </Dropdown.Content>
                    </Dropdown>
                ) : (
                    <div>
                        <Button className=" mx-2">
                            <span className="mr-2">
                                <i className="fas fa-cart-plus"></i>
                            </span>
                            {t('MyCart')}
                        </Button>
                        <Button className=" mx-2">
                            <Link href={route('login')}>{t('Login')}</Link>
                        </Button>
                    </div>
                )}
            </NavWrapper>
            <div className="h-px bg-black mb-5"></div>
        </>
    );
};

export default Navbar;
