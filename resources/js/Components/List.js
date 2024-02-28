import React from 'react';

export default function List({ data }) {
    console.log(data);
    return (
        <div>
            {data.map((e) => {
                return (
                    <div>
                        <label>Name: {e.name}</label>
                        <div>
                            Description: <br />
                            {e.description}
                        </div>
                        <div></div>
                    </div>
                );
            })}
        </div>
    );
}
