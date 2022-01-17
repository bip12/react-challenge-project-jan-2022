import React from 'react';
import { render, screen } from '@testing-library/react';

import OrdersList from './ordersList';

describe('Orders List', () => {
    test('renders with no prop', () => {
        render(
            <OrdersList
            />
        )
        const emptyDiv = document.getElementsByClassName('empty-orders');
        const arr = Array.from(emptyDiv);
        expect(arr.length).toBe(1);
    });

    test('renders one order', () => {
        const updatedAt = new Date(2022, 0, 15, 20, 33, 31, 0);
        const orders = [
            {
                order_item: "Food",
                quantity: "777",
                _id: 1, 
                updatedAt: updatedAt
            }
        ];
        render(
            <OrdersList
                orders={orders}
            />
        )
        expect(screen.getByText('Food')).toBeInTheDocument();
        expect(screen.getByText(/^.*777.*$/gm)).toBeInTheDocument();
        expect(screen.getByText(/8:33:31 PM/)).toBeInTheDocument();
    });

    test('renders multiple orders', () => {
        const orders = [
            {
                order_item: "Food",
                quantity: "777",
                _id: 1,
                updatedAt: new Date(2022, 0, 15, 21, 34, 36, 0)
            },
            {
                order_item: "Drink",
                quantity: "888",
                _id: 2,
                updatedAt: new Date(2022, 0, 15, 11, 55, 9, 0)
            }
        ];
        render(
            <OrdersList
                orders={orders}
            />
        )
        expect(screen.getByText('Food')).toBeInTheDocument();
        expect(screen.getByText(/^.*777.*$/gm)).toBeInTheDocument();
        expect(screen.getByText(/9:34:36 PM/)).toBeInTheDocument();

        expect(screen.getByText('Drink')).toBeInTheDocument();
        expect(screen.getByText(/^.*888.*$/gm)).toBeInTheDocument();
        expect(screen.getByText(/11:55:09 AM/)).toBeInTheDocument();


    });
})