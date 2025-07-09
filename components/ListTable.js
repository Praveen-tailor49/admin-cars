import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import EditModal from './EditModal'

const options = [
    { value: 0, label: 'Pending' },
    { value: 1, label: 'Approved' },
    { value: 2, label: 'Rejected' },
]

const ListTable = ({ dataList }) => {

    const [car, setCar] = useState({ carList: dataList, filterList: dataList })
    const { carList, filterList } = car
    const [data, setData] = useState({ isOpen: false, editData: {} })
    const { isOpen, editData } = data;

    // pagination data
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalPages = Math.ceil(filterList.length / itemsPerPage);
    const currentItems = filterList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleFilter = (status) => {
        let upValue = []
        if (status == 3) upValue = carList
        else { const res = carList?.filter((val) => val.status == status); upValue = res }

        setCar((prv) => ({ ...prv, filterList: upValue }))
    }

    const updateStatus = async (id, status) => {
        const res = await fetch('/api', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) })

        if (res.ok) {
            toast.success('Update successful!');
            setCar((prv) => {
                const updatedList = prv.filterList?.map((item) => item.id === id ? { ...item, status } : item);
                return { carList: updatedList, filterList: updatedList };
            });

        } else {
            const err = await res.json();
            toast.error(err.message || 'Not Updated');
        }
    }

    const onSubmit = async (data) => {
        const { id, status, model, name } = data || {}
        const res = await fetch('/api', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, data }) })
        if (res.ok) {
            toast.success('Update successful!');
            setCar(prv => {
                const updatedList = prv.filterList?.map((item) => item.id == id ? { ...item, status, model, name } : item)
                return { carList: updatedList, filterList: updatedList };
            })
            setData((prv) => ({ ...prv, isOpen: false, editData: {} }))
        } else {
            const err = await res.json();
            toast.error(err.message || 'Not Updated');
        }
    }

    return (
        <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
            <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
                <div className="flex items-center justify-between ">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">Car List</h3>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
                        <div className="container mx-auto">
                            <select id="op" className="bg-gray-200 border border-black-300 text-black-100 text-sm rounded-lg focus:ring-black-200 focus:border-black-200 block w-full p-2.5" onClick={(e) => handleFilter(e.target.value)}>
                                <option value='3'>All</option>
                                {
                                    options.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))
                                }
                            </select>

                        </div>
                    </div>
                </div>

            </div>
            <div className="p-0 overflow-auto" style={{ height: 'calc(100vh - 160px)' }}>
                {
                    currentItems?.length > 0 ?
                        <table className="w-full mt-4 text-left table-auto min-w-max">
                            <thead>
                                <tr>
                                    <th
                                        className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                        <p
                                            className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                            Car
                                        </p>
                                    </th>
                                    <th
                                        className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                        <p
                                            className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                            Modal
                                        </p>
                                    </th>
                                    <th
                                        className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                        <p
                                            className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                            Status
                                        </p>
                                    </th>
                                    <th
                                        className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                        <p
                                            className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                            Employed
                                        </p>
                                    </th>
                                    <th
                                        className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                        <p
                                            className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                        </p>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    currentItems?.map((item, index) =>
                                        <tr key={index}>
                                            <td className="p-3 border-b border-slate-200 px-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <p className="text-sm font-semibold text-slate-700">
                                                            {item.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3 border-b border-slate-200">
                                                <div className="flex flex-col">
                                                    <p className="text-sm font-semibold text-slate-700">
                                                        {item?.model}
                                                    </p>

                                                </div>
                                            </td>
                                            <td className="p-3 border-b border-slate-200">
                                                <div className="w-max">
                                                    <div
                                                        className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap  ${item?.status == 1 ? 'text-green-900 bg-green-500/20' : item?.status == 2 ? 'text-red-900 bg-red-500/20' : 'text-ornge-900 bg-orange-500/20'}`}>
                                                        <span className="">{item?.status == 1 ? 'Approve' : item?.status == 2 ? 'Reject' : 'Panding'}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3 border-b border-slate-200 flex justify-start items-center flex-row">
                                                <button className="rounded-full bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 cursor-pointer" type="button" onClick={() => updateStatus(item.id, 2)} disabled={item.status === 2}>
                                                    Reject
                                                </button>
                                                <button className={`rounded-full bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:b focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 cursor-pointer disabled:cursor-not-allowed`} type="button" onClick={() => updateStatus(item.id, 1)} disabled={item.status === 1} > Approve </button>

                                                <button className="rounded-full bg-white-600 py-2 px-4 border border-transparent text-center text-sm text-dark transition-all shadow-md hover:shadow-lg focus:bg-slate-00 focus:shadow-none active:bg-slate-700 hover:text-white hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 cursor-pointer disabled" type="button" onClick={() => setData((prv) => ({ ...prv, isOpen: true, editData: item }))}>
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>
                        :
                        <div className='flex justify-center items-center h-full'>
                            <p>Data not Found</p>
                        </div>
                }
            </div>
            <div className="flex justify-end items-center p-4 gap-3">
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded disabled:opacity-50" >
                    ‹
                </button>
                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded disabled:opacity-50">
                    ›
                </button>

                <span className="text-sm text-slate-600">Show</span>
                <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="border px-2 py-1 rounded text-sm" >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <EditModal {...{ isOpen, onClose: () => setData((prv) => ({ ...prv, isOpen: false })), onSubmit, editData }} />
        </div>
    )
}

export default ListTable;
