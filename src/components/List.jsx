import React, { useState } from 'react';

const List = ({ items, onClick }) => {
    const [activeItemId, setActiveItemId] = useState(null);

    const handleClick = (idV) => {
        setActiveItemId(idV);
        onClick(idV);
    };

    const firstIdv = items[0].idV;
    const lastIdv = items[items.length - 1].idV;

    return (
        <>
            {items &&
                <ul className='py-2 mb-6 mr-4 rounded-md border-2 border-solid border-zinc-300'>
                    {items.map((item) => (
                        <li
                            className={
                                item.idV === firstIdv ? ('px-8 pb-2 border-b-2 border-solid border-zinc-300 ' +
                                    (activeItemId === item.idV ? 'text-violet-600 font-medium' : ''))
                                    : (item.idV === lastIdv ? ('px-8 pt-2 ' +
                                        (activeItemId === item.idV ? 'text-violet-600 font-medium' : '')) : ('px-8 py-2 border-b-2 border-solid border-zinc-300 ')
                                    +
                                    (activeItemId === item.idV ? 'text-violet-600 font-medium' : ''))
                        }
                    key={item.idV}
                    onClick={() => handleClick(item.idV)}
                    >
                    Транспортное средство {item.idV}
                </li>
                ))}
        </ul >
            }
        </>);
}

export default List;