import React from 'react';
import {t} from 'i18next';

export default function Label({ forInput, value, className, children }) {
    var child;
    if(value){
        child = t(value);
    }else if(typeof children === 'string'){
        child = t(children);
    }else{
        child = children;
    }
    return (
        <label htmlFor={forInput} className={'block font-medium text-sm text-gray-700 ' + className}>
            {child}
        </label>
    );
}
