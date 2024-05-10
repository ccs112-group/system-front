import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [data, setData] = useState([]);
    const navigate = useNavigate(); // Define navigate function

    useEffect(async () => {
        let result = await fetch('http://127.0.0.1:8000/api/');
        result = await result.json();
        setData(result);
    }, []);

    const addToCart = async (productId) => {
        const user = JSON.parse(localStorage.getItem('user-info'));
        const userId = user ? user.id : '';

        if (!userId) {
            navigate('/login'); // Use navigate function
            return;
        }

        const item = { userId, productId, qty: 1 };

        let result = await fetch("http://127.0.0.1:8000/api/add_to_cart", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(item)
        });
        result = await result.json();

        console.log(result);
    };

    return (
        <>
            <section className="py-5">
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {data.map((item) => (
                            <div className="col" key={item.id}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">{item.description}</p>
                                        <p className="card-text">₱ {item.price}</p>

                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-primary" onClick={() => addToCart(item.id)} type="button">
                                            <i >Add to Cart</i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}