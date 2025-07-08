import React from 'react'

const page = () => {
    return (
        <>
            <nav className="container mx-auto p-4 pt-6 mb-4 flex items-center text-gray-700">
                <a className="text-2xl font-semibold cursor-pointer">Admin Panal</a>
            </nav>
            <main className="container mx-auto">
                <div className='p-10 mx-auto mt-12 max-w-[600px] bg-white flex flex-col items-center justify-center text-gray-700 runded-lg shadow-lg'>
                    <div className="w-full mb-4">
                        <h1 className="text-4xl font-semibold ">Welcome back.</h1>
                    </div>
                    <div className="w-full mb-6">
                        <input className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500" type="text" placeholder="Email" />
                        <input className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500" type="text" placeholder="Password" />

                        <div className="flex items-center">
                            <div className="w-1/2 flex items-center">
                                <input id="remember-me" type="checkbox" className="mt-1 mr-2" />
                                <label htmlFor="remember-me">Remember me!</label>
                            </div>
                            <button className="ml-auto w-1/2 bg-gray-800 text-white p-2 rounded font-semibold hover:bg-gray-900" type="submit">
                                Log In
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default page