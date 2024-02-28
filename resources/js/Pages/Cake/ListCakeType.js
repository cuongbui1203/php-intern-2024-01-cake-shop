import List from '@/Components/List';
import React from 'react';

export default function ListCakeType({ cakeTypes }) {
    return (
        <div>
            <List data={cakeTypes} />
        </div>
    );
}
