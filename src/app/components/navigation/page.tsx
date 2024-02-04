import { useState } from "react";
import Image from 'next/image'
import Link from 'next/link'

function Navigation(){
    return(
        <div>
            <button type="button" className="text-gray-500 hover:text-gray-600 lg:hidden" data-hs-overlay="#docs-sidebar" aria-controls="docs-sidebar" aria-label="Toggle navigation">
                <span className="sr-only">Toggle Navigation</span>
                <svg className="flex-shrink-0 w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
            </button>

            <div className="flex flex-col h-screen w-100 pl-6 pr-3 bg-dark-blue-bg border-r-2 border-line hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform   top-0 start-0 bottom-0 z-[60] border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700">
                <div className="py-10 h-20 mb-10">
                    <Image alt="" src={'/assets/dark-logo.svg'} width="200" height="200"/>
                </div>
                <ul className="flex flex-col py-10 pl-2 pr-4 pl-50">
                    <li className='hover:bg-btn-purple py-1 rounded-md mb-2'>
                        <Link href="/" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                        <span className="text-lg font-medium pl-1">Dashboard</span>
                        </Link>
                    </li>
                    <li className='hover:bg-btn-purple py-1 rounded-md mb-2'>
                        <Link href="/profile" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                        <span className="text-lg font-medium pl-1">Profile</span>
                        </Link>
                    </li>
                    <li className='hover:bg-btn-purple py-1 rounded-md mb-2'>
                        <Link href="/calendar" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                        <span className="text-lg font-medium pl-1">Calendar</span>
                        </Link>
                    </li>
                    <li className='hover:bg-btn-purple py-1 rounded-md mb-2'>
                        <Link href="/favorites" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                        <span className="text-lg font-medium pl-1">Favorites</span>
                        </Link>
                    </li>
                    <li className='hover:bg-btn-purple py-1 rounded-md mb-2'>
                        <Link href="/categories" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                        <span className="text-lg font-medium pl-1">Categories</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Navigation;