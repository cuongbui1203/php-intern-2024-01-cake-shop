import React, { useEffect, useState } from 'react';
import { Link, Head, InertiaLink } from '@inertiajs/inertia-react';
import { t } from 'i18next';
import ProductList from '@/Components/ProductList';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Button from '@/Components/Button';

export default function Welcome(props) {
    const [cakes, setCakes] = useState([]);
    const [cookies, setCookie] = useCookies();
    useEffect(() => {
        const getCakes = async () => {
            const res = await axios.get('/api/cakes', {
                headers: {
                    'X-XSRF-TOKEN': cookies['XSRF-TOKEN']
                }
            });
            setCakes(res.data);
        };
        getCakes();
    }, []);
    console.log(cakes);
    return (
        <>
            <Head title="Welcome" />
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {props.auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="text-sm text-gray-700 underline"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="text-sm text-gray-700 underline"
                            >
                                {t('Login')}
                            </Link>

                            <Link
                                href={route('register')}
                                className="ml-4 text-sm text-gray-700 underline"
                            >
                                {t('Register')}
                            </Link>
                        </>
                    )}
                </div>
                <ProductList />
            </div>
            <div>
                <InertiaLink href="/cakes">show more</InertiaLink>
            </div>
        </>
    );
}
