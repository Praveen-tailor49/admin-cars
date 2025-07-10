import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import EditModal from './EditModal'
import { getName, getNameWithoutIcn } from './utils'

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
    const [searchVal, setSearchVal] = useState(3);

    // pagination data
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalPages = Math.ceil(filterList.length / itemsPerPage);
    const currentItems = filterList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleFilter = (status) => {
        setSearchVal(status)
        let upValue = []
        if (status == 3) upValue = carList
        else { const res = carList?.filter((val) => val.status == status); upValue = res }

        setCar((prv) => ({ ...prv, filterList: upValue }))
    }

    const updateStatus = async (id, status) => {

        handlerAuditLog({ id, status }, true)
        const res = await fetch('/api?status', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) })

        if (res.ok) {
            setCar((prv) => {
                const updatedList = prv.carList?.map((item) => item.id === id ? { ...item, status } : item);
                return { carList: updatedList, filterList: updatedList };
            });
            
            toast.success('Update successful!');
        } else {
            const err = await res.json();
            toast.error(err.message || 'Not Updated');
        }
    }

    const onSubmit = async (e, data) => {
        e.preventDefault();
        handlerAuditLog(data)
        const { id, status, model, name } = data || {}
        if (name && model) {
            const res = await fetch('/api?update', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, data }) })
            if (res.ok) {
                setCar(prv => {
                    const updatedList = prv.carList?.map((item) => item.id == id ? { ...item, status, model, name } : item)
                    return { carList: updatedList, filterList: updatedList };
                })
                setData((prv) => ({ ...prv, isOpen: false, editData: {} }))
                toast.success('Update successful!');
            } else {
                const err = await res.json();
                toast.error(err.message || 'Not Updated');
            }
        } else toast.error('Empty field!')
    }

    const handlerAuditLog = async (data, status) => {
        const payload = { name: 'admin', action: status ? getNameWithoutIcn(data.status) : 'Edit', changeFrom: [], changeTo: [] }
        const res = carList.filter(val => val.id == data.id)?.[0]
        if (status) {
            if (res.status != data.status) {
                payload.changeFrom.push(getNameWithoutIcn(res.status));
                payload.changeTo.push(getNameWithoutIcn(data.status));
            }
        } else {
            if (res.status != data.status) {
                payload.changeFrom.push(getNameWithoutIcn(res.status));
                payload.changeTo.push(getNameWithoutIcn(data.status));
            }
            if (res.name != data.name) {
                payload.changeFrom.push(res.name);
                payload.changeTo.push(data.name);
            }
            if (res.model != data.model) {
                payload.changeFrom.push(res.model);
                payload.changeTo.push(data.model);
            }
        }
        try {
            await fetch('/api?auditUpdate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        } catch { throw new Error('Audit Log Error') }
    }

    useEffect(() => {
        if (filterList?.length == carList?.length) setSearchVal(3)
    }, [filterList])

    return (
        <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
            <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
                <div className="flex items-center justify-between ">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">Car List</h3>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <label htmlFor="filter" className="text-sm font-medium text-gray-700">
                            Search
                        </label>

                        <select id="filter" className="w-full sm:w-40 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-b transition" onChange={(e) => handleFilter(e.target.value)} value={searchVal} >
                            <option value={3}>All</option>
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

            </div>
            <div className="p-0 overflow-auto" style={{ height: 'calc(100vh - 170px)' }}>
                {
                    currentItems?.length > 0 ?
                        <table className="w-full mt-4 text-left table-auto min-w-max">
                            <thead className="bg-gray-100 text-gray-600 text-sm font-semibold">
                                <tr>
                                    <th className="px-4 py-3 w-[35%]">Car</th>
                                    <th className="px-4 py-3 w-[10%]">Model</th>
                                    <th className="px-4 py-3 w-[15%]">Status</th>
                                    <th className="px-4 py-3 w-[40%]">Actions</th>
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
                                                    <div className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap  ${item?.status == 1 ? 'text-green-900 bg-green-500/20' : item?.status == 2 ? 'text-red-900 bg-red-500/20' : 'text-ornge-900 bg-orange-500/20'}`}>
                                                        <span className={`px-2 py-1 text-xs rounded-full font-semibold flex items-center gap-1${item.status == 1 && 'bg-green-100 text-green-800'}${item.status == 2 && 'bg-red-100 text-red-800'}${item.status == 0 && 'bg-yellow-100 text-yellow-800'}`}>
                                                            {getName(item.status)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3 border-b border-slate-200 flex justify-start items-center flex-row">
                                                <button className=" cursor-pointer flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-semibold px-4 py-1.5 rounded-full shadow-sm hover:shadow transition disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed" onClick={() => updateStatus(item.id, 2)} disabled={item.status == 2}>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    Reject
                                                </button>

                                                <button className="cursor-pointer ml-2 flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full shadow-sm hover:shadow transition disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed" onClick={() => updateStatus(item.id, 1)} disabled={item.status === 1}>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Approve
                                                </button>

                                                <button className="cursor-pointer ml-2 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold px-4 py-1.5 rounded-full shadow-sm hover:shadow transition" onClick={() => setData((prv) => ({ ...prv, isOpen: true, editData: item }))}>
                                                    <svg width="10" height="10" viewBox="0 0 428 428" fill="none">
                                                        <path d="M64.6666 342H155.12C157.928 342.016 160.711 341.478 163.31 340.416C165.909 339.355 168.273 337.791 170.267 335.813L317.893 187.973L378.48 128.667C380.479 126.683 382.067 124.324 383.15 121.724C384.233 119.125 384.79 116.336 384.79 113.52C384.79 110.704 384.233 107.915 383.15 105.316C382.067 102.716 380.479 100.357 378.48 98.3733L288.027 6.85333C286.043 4.85379 283.684 3.26671 281.084 2.18365C278.485 1.10058 275.696 0.542969 272.88 0.542969C270.064 0.542969 267.275 1.10058 264.676 2.18365C262.076 3.26671 259.716 4.85379 257.733 6.85333L197.573 67.2267L49.52 215.067C47.5428 217.06 45.9785 219.424 44.9168 222.023C43.8552 224.623 43.3171 227.406 43.3333 230.213V320.667C43.3333 326.325 45.5809 331.751 49.5817 335.752C53.5825 339.752 59.0087 342 64.6666 342ZM272.88 52.08L333.253 112.453L302.96 142.747L242.587 82.3733L272.88 52.08ZM86 238.96L212.507 112.453L272.88 172.827L146.373 299.333H86V238.96ZM406 384.667H22C16.342 384.667 10.9158 386.914 6.91501 390.915C2.91424 394.916 0.666626 400.342 0.666626 406C0.666626 411.658 2.91424 417.084 6.91501 421.085C10.9158 425.086 16.342 427.333 22 427.333H406C411.658 427.333 417.084 425.086 421.085 421.085C425.086 417.084 427.333 411.658 427.333 406C427.333 400.342 425.086 394.916 421.085 390.915C417.084 386.914 411.658 384.667 406 384.667Z" fill="black" />
                                                    </svg>
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
