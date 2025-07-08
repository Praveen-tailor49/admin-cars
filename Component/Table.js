import React from 'react'

const options = [
    { value: '1', label: 'Approved' },
    { value: '2', label: 'Pending' },
    { value: '3', label: 'Rejected' },
]

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/cars');
  const data = await res.json();
console.log('sdfsdafsdafsdaf', data);

  return {
    props: {
      data
    }
  }
}


export default function Table({ data }) {


    return (
        <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
            <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
                <div className="flex items-center justify-between ">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">Car List</h3>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
                        <div className="container mx-auto">
                            <select id="op" className="bg-gray-50 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value='0'>All</option>
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
            <div className="p-0 overflow-auto" style={{ height: 'calc(100vh - 144px)' }}>
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
                            data?.map((item, index) =>
                                <tr key={index}>
                                    <td className="p-3 border-b border-slate-200 px-5">
                                        <div className="flex items-center gap-3">
                                            {/* <img src={item.image} alt="img" className="relative inline-block h-9 w-9 !rounded-full object-cover object-center" /> */}
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
                                                className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap  ${item.status ? 'text-green-900 bg-green-500/20' : 'text-red-900 bg-red-500/20'}`}>
                                                <span className="">{item?.status ? 'Approve' : 'Reject'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-3 border-b border-slate-200">
                                        <button className="rounded-full bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 cursor-pointer" type="button">
                                            Reject
                                        </button>
                                        <button className="rounded-full bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 cursor-pointer" type="button">
                                            Approve
                                        </button>
                                        <button className="rounded-full bg-white-600 py-2 px-4 border border-transparent text-center text-sm text-dark transition-all shadow-md hover:shadow-lg focus:bg-slate-00 focus:shadow-none active:bg-slate-700 hover:text-white hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 cursor-pointer" type="button">
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between p-3 pt-0">
                <p className="block text-sm text-slate-500">
                    Page 1 of 10
                </p>
                <div className="flex gap-1">
                    <button
                        className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        Previous
                    </button>
                    <button
                        className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}