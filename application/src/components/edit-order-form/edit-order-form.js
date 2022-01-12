import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Template } from '..';
import { SERVER_IP } from '../../private';
import '../order-form/orderForm.css';
import { useParams } from 'react-router-dom';

const EDIT_ORDER_URL = `${SERVER_IP}/api/edit-order`;

export default function EditForm() {
    const params = useParams();
    const [orderItem, setOrderItem] = useState("");
    const [quantity, setQuantity] = useState("1");

    const menuItemChosen = (event) => setOrderItem(event.target.value);
    const menuQuantityChosen = (event) => setQuantity(event.target.value);

    const auth = useSelector((state) => state.auth);

    const submitOrder = () => {
        if (orderItem === "") return;
        fetch(EDIT_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({
                id: params.id,
                order_item: orderItem,
                quantity,
                ordered_by: auth.email || 'Unknown!',
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log("Success", JSON.stringify(response)))
        .catch(error => console.error(error));
    }

    return (
        <Template>
            <div className="form-wrapper">
                <form>
                    <label className="form-label">I'd like to order...</label><br />
                    <select 
                        value={orderItem} 
                        onChange={(event) => menuItemChosen(event)}
                        className="menu-select"
                    >
                        <option value="" defaultValue disabled hidden>{orderItem}</option>
                        <option value="Soup of the Day">Soup of the Day</option>
                        <option value="Linguini With White Wine Sauce">Linguini With White Wine Sauce</option>
                        <option value="Eggplant and Mushroom Panini">Eggplant and Mushroom Panini</option>
                        <option value="Chili Con Carne">Chili Con Carne</option>
                    </select><br />
                    <label className="qty-label">Qty:</label>
                    <select value={quantity} onChange={(event) => menuQuantityChosen(event)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                    <button type="button" className="order-btn" onClick={() => submitOrder()}>Edit Order</button>
                </form>
            </div>
        </Template>
    )
}