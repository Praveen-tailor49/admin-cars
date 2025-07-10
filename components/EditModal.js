import React, { useState } from 'react';

const EditModal = ({ isOpen, onClose, onSubmit, editData }) => {
    if (!isOpen) return null;

    const [list, setList] = useState(editData)

    return (
        <>
            {/* <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
                <div aria-hidden="true" className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer">
                </div>
                <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
                    <div className="w-full py-2 bg-white cursor-default pointer-events-auto relative rounded-xl mx-auto max-w-sm">
                        <button type="button" className="absolute top-2 right-2 rtl:right-auto rtl:left-2" onClick={onClose}>
                            <svg xlinkTitle="Close" className="h-4 w-4 hover:rotate-180 transition-all ease-in-out duration-500 cursor-pointer text-gray-400"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"></path>
                            </svg>

                        </button>

                        <div className="space-y-2 p-2">
                            <div className="p-2 space-y-2 text-center ">
                                <h2 className="text-xl font-bold tracking-tight" id="page-action.heading">
                                    Edit List
                                </h2>

                            </div>
                        </div>

                        <div className="space-y-2">
                            <div aria-hidden="true" className="border-t border-gray-700 px-2"></div>

                            <div className="grid grid-cols-1 place-items-center px-4 py-2">
                                <form noValidate className="space-y-4">
                                    <div>
                                        <label htmlFor="Car Name" className="mb-2 text-gray-400 text-lg">Car Name<span className="text-red-600 inline-block p-1 text-sm">*</span></label>
                                        <input
                                            id="Car Name" value={list?.name} onChange={(e) => setList(prv => ({ ...prv, name: e.target.value }))}
                                            className="border p-3 shadow-md  border-gray-700 placeholder:text-base focus:outline-none ease-in-out duration-300 rounded-lg w-full"
                                            type="text"
                                            placeholder="Car Name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="model" className="mb-2 text-gray-400 text-lg">model<span className="text-red-600 inline-block p-1 text-sm">*</span></label>
                                        <input
                                            id="model" value={list?.model} onChange={(e) => setList(prv => ({ ...prv, model: e.target.value }))}
                                            className="border p-3  border-gray-700 shadow-md placeholder:text-base focus:outline-none ease-in-out duration-300 rounded-lg w-full"
                                            type="text"
                                            placeholder="model"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="carType" className="mb-2 text-gray-400 text-lg">
                                            Car Type
                                            <span className="text-red-600 inline-block p-1 text-sm">*</span>
                                        </label>
                                        <select
                                            id="carType"
                                            className="border p-3 border-gray-700 shadow-md placeholder:text-base focus:outline-none ease-in-out duration-300 rounded-lg w-full bg-white" value={list?.status} onChange={(e) => setList(prv => ({ ...prv, status: e.target.value }))}
                                            required
                                        >
                                            <option value="">Select Type</option>
                                            <option value={1}>Approved</option>
                                            <option value={2}>Reject</option>
                                            <option value={0}>Pending</option>
                                        </select>
                                    </div>
                                </form>
                            </div>

                            <div aria-hidden="true" className="border-b border-gray-700 px-2"></div>
                            <div className="px-6 py-2">
                                <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                                    <button type="button" className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset  min-h-[2.25rem] px-4 text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 " onClick={onClose}>
                                        Cancel
                                    </button>

                                    <button type="submit" onClick={() => onSubmit(list)}
                                        className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset  min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-[#4d1b80] hover:bg-[#7127BA] focus:bg-[#11071F] focus:ring-offset-[#11071F]">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/50 bg-opacity-40">
                <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-2xl border border-gray-100">
                    <div className="flex items-center justify-between border-b pb-3 mb-5">
                        <h2 className="text-xl font-semibold text-gray-800">Edit Car</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition text-xl cursor-pointer">&times;</button>
                    </div> 
                    <form className="space-y-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Car Name <span className="text-red-500">*</span>
                            </label>
                            <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500" placeholder="Enter car name" value={list?.name} onChange={(e) => setList(prv => ({ ...prv, name: e.target.value }))}/>
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Model <span className="text-red-500">*</span>
                            </label>
                            <input type="number" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500" placeholder="2024" value={list?.model} onChange={(e) => setList(prv => ({ ...prv, model: e.target.value }))}
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Car Type <span className="text-red-500">*</span>
                            </label>
                            <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500" value={list?.status} onChange={(e) => setList(prv => ({ ...prv, status: e.target.value }))}>
                                <option value={0}>Pending</option>
                                <option value={1}>Approved</option>
                                <option value={2}>Rejected</option>
                            </select>
                        </div> 
                        <div className="flex items-center justify-end gap-4 pt-4">
                            <button type="button" className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer" onClick={onClose} >
                                Cancel
                            </button>
                            <button type="submit" className="px-5 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700 shadow-md cursor-pointer" onClick={(e) => onSubmit(e, list)}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditModal;