import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CartList({ cartItem }) {
    const [data, setData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const user = JSON.parse(localStorage.getItem('user-info'));
    const userId = user ? user.id : '';

    useEffect(() => {
        getData();
    }, []);

    async function removeItem(cartId) {
        let result = await fetch("http://127.0.0.1:8000/api/removeitem/" + cartId, {
            method: 'DELETE'
        });
        result = await result.json();
        cartItem();
        getData();
        console.log(result);
    }

    async function getData() {
        let result = await fetch('http://127.0.0.1:8000/api/cartlist/' + userId);
        result = await result.json();
        setData(result);

        // Calculate total price
        let totalPrice = result.reduce((acc, item) => {
            return acc + (item.price * item.qty);
        }, 0);
        setTotalPrice(totalPrice);
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <h2 className="card-header">Shopping Cart</h2>
                        <div className="row g-1 border-bottom">
                            <div className="col-md-12">
                                <ul className="list-group list-group-flush">
                                    {data.map(item => (
                                        <li key={item.cart_id} className="list-group-item">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <p className="badge bg-secondary mt-2"><b>Price:</b> {`₱${item.price}`}</p>
                                                    <p className="badge bg-primary rounded-pill mt-2"><b>Quantity:</b> {item.qty}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <button className="btn btn-danger" onClick={() => removeItem(item.cart_id)}>Remove Item</button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                   
                                </ul>
                            </div>
                        </div>
                        <div className="card-footer d-flex justify-content-between">
                            <p className="card-text">Total Price: {`₱${totalPrice}`}</p>
                            <Link className="btn btn-success" to="/checkout">Order Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
