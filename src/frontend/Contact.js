import React from 'react';
import contactBg from "../assets/img/contact-bg.jpg";

export default function Contact() {
  return (
    <>
        {/* Page Header */}
        <header className="masthead" style={{ backgroundImage:`url(${contactBg})`}}>
            <div className="container position-relative px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <div className="page-heading text-white">
                            <h1>Contact Me</h1>
                            <span className="fs-5">Have questions? We have answers..</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        {/* Main Content */}
        <main className="mb-4">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <p className="fs-5">Want to get in touch? Fill out the form below to send me a message and I will get back to you as soon as possible!</p>
                        <div className="my-5">
                            <form id="contactForm">
                                <div className="form-floating">
                                    <input className="form-control" id="name" type="text" placeholder="Enter your name..." required />
                                    <label for="name">Name</label>
                                </div>
                                <div className="form-floating">
                                    <input className="form-control" id="email" type="email" placeholder="Enter your email..." required />
                                    <label for="email">Email address</label>
                                </div>
                                <div className="form-floating">
                                    <input className="form-control" id="phone" type="tel" placeholder="Enter your phone number..." required />
                                    <label for="phone">Phone Number</label>
                                </div>
                                <div className="form-floating">
                                    <textarea className="form-control" id="message" placeholder="Enter your message here..." style={{height: '12rem'}} data-sb-validations="required"></textarea>
                                    <label for="message">Message</label>
                                </div>
                                <br />
                                {/* Submit Button */}
                                <button className="btn btn-primary text-uppercase" id="submitButton" type="submit">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>
  )
}