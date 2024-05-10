import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout({ cartItem }) {
    const [data, setData] = useState([]);
    const [address, setAddress] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('');
    
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user-info'));
    const userId = user ? user.id : '';

    useEffect(() => {
        async function getData() {
            if (!userId) {
                navigate('/login');
            }
            let result = await fetch('http://127.0.0.1:8000/api/checkout/' + userId);
            result = await result.json();
            setData(result);
        }
        getData();
    }, []);

    if (!data[0]) {
        navigate('/');
    }

    let total = 0;
    data.map((item) => (total += parseFloat(item.price)));
    let shippingFee = 100;

    function onChangeValue(e) {
        setSelectedPayment(e.target.value);
    }

    async function orderPlace() {
        const item = { userId, address, payment: selectedPayment };
        let result = await fetch('http://127.0.0.1:8000/api/orderplace', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Type': 'application/json',
            },
            body: JSON.stringify(item),
        });
        result = await result.json();
        if (result) {
            cartItem();
            navigate('/massage');
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="mb-0">Checkout</h3>
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>Price</td>
                                        <td>₱ {total}</td>
                                    </tr>
                                    <tr>
                                        <td>Shipping Fee</td>
                                        <td>₱ {shippingFee}</td>
                                    </tr>
                                    <tr>
                                        <td>Total Amount</td>
                                        <td>₱ {total + shippingFee}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="address">Address:</label>
                                    <input 
                                        type="text" 
                                        className="form-control custom-border" // Added custom-border class
                                        value={address} 
                                        onChange={(e) => setAddress(e.target.value)} 
                                        id="address" 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="payment">Payment Method</label>
                                    <select className="form-control" value={selectedPayment} onChange={onChangeValue}>
                                        <option value="">Select Payment Method</option>
                                        <option value="creditcard">Credit Card</option>
                                        <option value="cash">Cash on Delivery</option>
                                        <option value="gcash">GCash</option>
                                    </select>
                                </div>
                                <button className="btn btn-success" type="button" onClick={orderPlace}>Place Order</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
