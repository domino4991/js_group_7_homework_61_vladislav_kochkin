import React from 'react';
import './Countries.css';

const Countries = props => {
    return (
        <section className="Countries">
            <h5 className="Countries-title">Список стран</h5>
            <ul className="Countries-list">
                {props.children}
            </ul>
        </section>
    );
};

export default Countries;