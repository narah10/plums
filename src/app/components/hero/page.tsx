"use client";

import React, { useState, useEffect } from 'react';
import Quote from '../../../models/quotes';
import quotesList from '../../../data/quotes.json';
import Link from 'next/link';

export default function Hero() {
    const [quote, setQuote] = useState<string>("");
    const [author, setAuthor] = useState<string>("");

    useEffect(() => {
        // Select a random quote from the quotesList
        const randomIndex = Math.floor(Math.random() * quotesList.length);
        const randomQuote: Quote = quotesList[randomIndex];
        // Set the quote and author state variables
        setQuote(randomQuote.quote);
        setAuthor(randomQuote.author);
    }, []);

    let [isOpen, setIsOpen] = useState(false);

    return (
        <div id="hero-container" className="md:flex bg-gradient-to-r from-purple p-8 rounded-xl md:justify-between shadow-xl w-full md:min-w-9xl">
            <div id="quote" className="w-3/5">
                <h1 className="text-white text-xl font-bold py-1 md:text-2xl">Quote of the day</h1>
                <p className="text-white py-1 md:text-lg">{quote}</p>
                <h2 className="text-white font-light py-1 text-md">{author}</h2>
            </div>
            <button>
                <Link href="/newnotes">
                <div id="add-task-btn" className="bg-gray md:py-5 md:px-10 rounded-lg shadow-lg flex flex-col justify-center items-center">
                    <p className="text-dark-purple flex p-3"><span className="md:hidden">Add&nbsp;</span>New Topic</p>
                    <div className="hidden md:block md:mb-4">
                        <svg width="80" height="80" viewBox="0 0 513 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M244.208 0.624673C235.011 2.92367 227.821 8.68867 223.431 17.2807L220.974 22.0907V224.527L23.974 225.091L18.428 227.692C10.771 231.284 6.044 235.727 2.777 242.404C0.492 247.075 0 249.408 0 255.591C0 268.514 6.061 277.689 18.428 283.49L23.974 286.091L220.419 286.656L220.696 387.374C220.973 487.852 220.979 488.102 223.111 492.713C229.356 506.219 242.775 513.342 256.839 510.617C267.679 508.517 275.697 501.774 279.615 491.462C281.382 486.812 281.474 481.623 281.474 386.612V286.654L486.974 286.091L492.52 283.49C500.177 279.898 504.904 275.455 508.171 268.778C510.462 264.096 510.946 261.788 510.936 255.597C510.916 243.205 505.111 233.999 493.807 228.434L487.211 225.187L281.474 225.761V126.042C281.474 51.6927 281.17 25.2757 280.279 22.2067C278.823 17.1887 275.479 11.6367 271.755 8.05367C265.412 1.95067 252.66 -1.48833 244.208 0.624673Z" fill="#734A73"/>
                        </svg>
                    </div>
                </div>
                </Link>
            </button>
        </div>
    );
}