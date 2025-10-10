import React from 'react';
import image1 from '../../images/icons/image1.svg';
import FotoSidebar from './content/FotoSidebar';

export default function Sidebar({
    sidebarOpen, setSidebarOpen
}) {
    return (
        <>
            <aside className="hidden min-h-screen lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col pl-1">
                <div className="p-6">
                    <FotoSidebar foto={image1} titulo="CLEO-TAGINADOR" />

                    <nav className="mt-8">
                        <ul>
                            <li>
                                <a className='flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/20 dark:hover:bg-primary/30' href="posts">
                                    <span className='font-medium'>Posts</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}