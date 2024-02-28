import List from '@/Components/List';
import React from 'react';

export default function ListCakes({ cakes }) {
    console.log(cakes);
    return (
        <div>
            <List data={cakes} />
        </div>
    );
}
