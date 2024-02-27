import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import ListCakes from './Cake/ListCakes';
import Navbar from '@/Components/Navbar';

export default function Welcome(props) {
    const [cakes, setCakes] = useState([]);
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
            <ListCakes />
        </>
    );
}
