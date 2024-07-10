import React from 'react';
import { FaRegNewspaper } from 'react-icons/fa';
import AddArticle from './AddArticle';
import { useSearchParams, useLocation } from 'react-router-dom';
export default function Header() {
    const [queryParameter] = useSearchParams();
    let editMode = queryParameter.get('id');
    const location = useLocation();
    let createMode = location.pathname;

    return (
        <div className="container mx-auto ">
            <div className="flex justify-between items-center py-4">
                <div className="w-1/2 font-semi  text-purple-700 text-xl ">
                    <a href="/">
                        <span className="text-4xl">
                            <FaRegNewspaper />
                        </span>
                        <p>News - Backend</p>
                    </a>
                </div>

                <nav className=" xl:relative top-16 xl:top-0 flex justify-end md:items-center bg-white   lg:shadow-none sm:mt-0 xl:mr-10 py-2 w-full">
                    {/* Render button if not 
                    in edit mode or create mode */}
                    {editMode || createMode == '/new' ? (
                        ''
                    ) : (
                        <AddArticle className="flex hover:bg-slate-50 m-4 shadow border py-1 px-2" />
                    )}
                    {}
                </nav>
            </div>
        </div>
    );
}
