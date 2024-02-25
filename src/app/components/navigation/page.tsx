"use client"; 
import { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import HintIcon from "../hint/page";

function Navigation() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='static'>
        <button type="button" className="m-10 lg:hidden" onClick={toggleSidebar} aria-label="Toggle navigation">
            <span className="sr-only">Toggle Navigation</span>
            <svg width="50" height="19" viewBox="0 0 37 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="37" height="5" rx="2" fill="#92369C"/>
                <rect y="7" width="37" height="5" rx="2" fill="#92369C"/>
                <rect y="14" width="37" height="5" rx="2" fill="#92369C"/>
            </svg>
        </button>

        <div className={`flex flex-col lg:h-screen w-100 pr-3 bg-dark-blue-bg lg:bg-dark-blue-bg border-r-2 border-line hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-200 transform start-0 bottom-0 z-[60] border-e border-gray-200 pt-7 pb-10 overflow-x-auto absolute top-20 lg:static lg:top-0 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="py-10 h-20 mb-10 pl-10">
                <Image alt="" src={'/assets/dark-logo.svg'} width="200" height="200" />
            </div>
            <ul className="pl-10 flex flex-col py-6 pr-4 pl-50">
                <li className='hover:bg-btn-purple py-1 rounded-md mb-2'>
                    <Link href="/" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200">
                    <span className="text-lg font-medium pl-1">Dashboard</span>
                    </Link>
                </li>
                <li className='hover:bg-btn-purple py-1 rounded-md mb-2'>
                    <Link href="/profile" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200">
                    <span className="text-lg font-medium pl-1">Profile</span>
                    </Link>
                </li>
                <li className='hover:bg-btn-purple py-1 rounded-md mb-2'>
                    <Link href="/calendar" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200">
                    <span className="text-lg font-medium pl-1">Calendar</span>
                    </Link>
                </li>
                <li className='hover:bg-btn-purple py-1 rounded-md mb-2'>
                    <Link href="/favorites" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200">
                    <span className="text-lg font-medium pl-1">Favorites</span>
                    </Link>
                </li>
                <li className='hover:bg-btn-purple py-1 rounded-md'>
                    <Link href="/notes" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200">
                    <span className="text-lg font-medium pl-1">Notes</span>
                    </Link>
                </li>
            </ul>
            <div className="pl-6 pr-2">
                <HintIcon/>
            </div>
        </div>
    </div>
  );
}

export default Navigation;
