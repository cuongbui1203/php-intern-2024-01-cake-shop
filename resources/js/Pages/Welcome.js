import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import ListCakes from './Cake/ListCakes';
import Navbar from '@/Components/Navbar';

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <Navbar auth={props.auth} />
            <ListCakes auth={props.auth} />
        </>
    );
}
