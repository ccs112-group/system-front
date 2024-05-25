import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
    const [data, setData] = useState([]);
    const navigate = useNavigate(); // Define navigate function
    const [ selectedItem, setSelectedItem] = useState(null);
    const [ editItem, setEditItem] = useState(null);
    const [ deleteItem, setDeleteItem] = useState(null);

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


    const openViewItem = (item) => {
        setSelectedItem(item)
    }
    const handleCloseModal = () => {
        setSelectedItem(null);
        setEditItem(null);
        setDeleteItem(null);
    };

    const openEditItem = (item) => {
        setEditItem(item);
    }
    const submitEditedItem = async () => {
        let id = document.getElementById("id");
        let description = document.getElementById("description");
        let price = document.getElementById("price");

        let result = await fetch("http://127.0.0.1:8000/api/edit-item", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: {
                id,
                description,
                price
            }
        });
        result = await result.json();

        console.log(result);

    } 

    const openDeleteItem = (item) => {
        setDeleteItem(item);        
    }

    const submitDeletedItem = async () => {
        let id = document.getElementById("id");

        let result = await fetch("http://127.0.0.1:8000/api/delete-item", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: {
                id
            }
        });
        result = await result.json();

        console.log(result);

    } 

    return (
        <div className='tbl'>
            <table className='table-prod'>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Options</th>
                </tr>
                {data.map((item) => (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>
                        <button className="btn btn-success" onClick={() => openViewItem(item)} type="button">
                            <i >View</i>
                        </button>
                        <button className="btn btn-warning" onClick={() => openEditItem(item)} type="button">
                            <i >Edit</i>
                        </button>
                        <button className="btn btn-danger" onClick={() => openDeleteItem(item)} type="button">
                            <i >Delete</i>
                        </button>
                    </td>
                </tr>
                ))}
            </table>
            {/* Modal for viewing item details */}
            {selectedItem && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedItem.name} Details</h5>
                                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Description: {selectedItem.description}</p>
                                <p>Price: ₱ {selectedItem.price}</p>
                                {/* Add more item details here if needed */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {editItem && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                <form>
                    <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header"><p id="id">{editItem.id}</p>
                                    <h5 className="modal-title"> {editItem.name} Details</h5>
                                    <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>Description: <input type='text' size="42"name='description' id='description' value={editItem.description}/></p>
                                    <p>Price: ₱ <input type='text'  name='price' id='price' value={editItem.price}/></p>
                                    {/* Add more item details here if needed */}
                                </div>
                                <div className="modal-footer">
                                    <input type="submit" className="btn btn-success" onSubmit={submitEditedItem}/>
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
            {deleteItem && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                <form>
                    <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header"><p id="id">{deleteItem.id}</p>
                                <h5 className="modal-title">Do you want to delete {deleteItem.name} ?</h5>
                                    {/* Add more item details here if needed */}
                                </div>
                                <div className="modal-footer">
                                    <input type="submit" className="btn btn-success" value='Yes'onSubmit={submitDeletedItem}/>
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>No</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
