import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderSuccessMassage() {
  return (
    <>
    {/* Order complete message */}
    <div className="container veiw-h">
        <div className="alert alert-success position-absolute top-50 start-50 translate-middle" role="alert">
            <h4 className="alert-heading text-center">Order Complete!</h4>
            <p className="text-center">Your order has been successfully placed.</p>
            <hr/>
            <div className="mb-0 d-grid gap-2 col-7 mx-auto">
                <Link className="btn btn-success btn-lg" to="/">Back to Homepage</Link>
            </div>
        </div>
    </div>
    </>
  )
}
