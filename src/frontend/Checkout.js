import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout({ cartItem }) {
    const [data, setData] = useState([]);
    const [address, setAddress] = useState('');
    const [payment, setPayment] = useState('');
    const [selectedPayment, setSelectedPayment] = useState(''); // Newly added state for selected payment method

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
        console.log(e.target.value);
    }

    async function orderPlace() {
        const item = { userId, address, payment: selectedPayment }; // Use selectedPayment instead of payment
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
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-5 bg-white p-3 mt-3">
                    <div className="row g-1 border-bottom">
                        <h3 className="col text-center">CHECK OUT</h3>
                    </div>
                    <div className="border-bottom">
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <td className="text-center">Price</td>
                                    <td className="text-center">₱ {total}</td>
                                </tr>
                                <tr>
                                    <td className="text-center">Shipping Fee</td>
                                    <td className="text-center">₱ {shippingFee}</td>
                                </tr>
                                <tr>
                                    <td className="text-center">Total Amount</td>
                                    <td className="text-center">₱ {total + shippingFee}</td>
                                </tr>
                            </tbody>
                        </table>

                        <form action="/orderplace">
                            <div className="form-group">
                                <label htmlFor="address">Delivery Address:</label>
                                <textarea className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} id="address" cols="30" rows="2" required />
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
                            <button className="btn btn-info" type="button" onClick={orderPlace}>Order Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
