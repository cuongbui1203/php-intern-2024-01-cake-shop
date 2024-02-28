import React, { useEffect, useState } from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import { t } from 'i18next';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Navbar from '@/Components/Navbar';

export default function Welcome(props) {
    const [cakes, setCakes] = useState([]);
    const [cookies, setCookie] = useCookies();
    useEffect(() => {
        const getCakes = async () => {
            const res = await axios.get('/api/cakes');
            setCakes(res.data);
        };
        getCakes();
    }, []);
    console.log(cakes);
    return (
        <>
            <Head title="Welcome" />
            <Navbar auth={props.auth} />
        </>
    );
}
