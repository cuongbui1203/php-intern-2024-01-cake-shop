import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/inertia-react';
import ListItemInCategory from '@/Components/Category/ListItemInCategory';
import Authenticated from '@/Layouts/Authenticated';
import { useTranslation } from 'react-i18next';
import FilterCake from '@/Components/FilterCake';
import ListCakes from './Cake/ListCakes';

export default function Welcome(props) {
    const [data, setData] = useState(null);
    const [t] = useTranslation();
    const [filter, setFilter] = useState({});
    const [state, setState] = useState(1);
    const [content, setContent] = useState([]);
    useEffect(() => {
        const loadData = async () => {
            const res = await axios.get(route('api.cakes.groupByType'));
            setData(res.data);
        };
        loadData();
    }, []);
    useEffect(() => {
        if (data) {
            const tem = [];
            for (const [key, value] of Object.entries(data)) {
                tem.push(<ListItemInCategory items={value} key={key} />);
            }
            setContent(tem);
        }
    }, [data]);

    return (
        <Authenticated auth={props.auth}>
            <Head title={t('HomePage')} />
            <FilterCake
                onChangeData={(data) => {
                    setFilter(data);
                    setState(2);
                }}
            />
            {state === 1 ? (
                <div className="flex flex-col align-items-center space-y-7">
                    {content}
                </div>
            ) : (
                <>
                    <ListCakes auth={props.auth} filter={filter} />
                </>
            )}
        </Authenticated>
    );
}
