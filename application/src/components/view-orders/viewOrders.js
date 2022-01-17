import React, { useState, useEffect } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import OrdersList from './ordersList';
import './viewOrders.css';

export default function ViewOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(`${SERVER_IP}/api/current-orders`, {signal: abortCont.signal })
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    setOrders(response.orders);
                } else {
                    console.log('Error getting orders');                                      
                }
            }).catch(err => {
                if (err === 'AbortError')
                {console.log('fetch aborted')}
            })
            return() => abortCont.abort();
    }, [orders]);

    

    return (
        <Template>
            <div className="container-fluid">
                <OrdersList
                    orders={orders}
                />
            </div>
        </Template>
    );
}