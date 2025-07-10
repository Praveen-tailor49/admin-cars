'use client'
import { useEffect, useState } from 'react';

export default function AuditLog() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch('/api?auditGet')
            .then((res) => res.json())
            .then(setLogs);
    }, []);

    return (
        <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
            <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
                <div className="flex items-center justify-between ">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">Audit List</h3>
                    </div>
                </div>

            </div>
            <div className="p-0 overflow-auto" style={{ height: 'calc(100vh - 170px)' }}>
                {logs.length > 0 ?
                    <table className="w-full mt-4 text-left table-auto min-w-max">
                        <thead className="bg-gray-100 text-gray-600 text-sm font-semibold">
                            <tr>
                                <th className="px-4 py-3 ">LogIn Admin Name</th>
                                <th className="px-4 py-3 ">Change From</th>
                                <th className="px-4 py-3 ">Change To</th>
                                <th className="px-4 py-3 ">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                logs?.map((item, index) =>
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
                                                    {item?.changeFrom?.map((i,n) => n + 1 == item?.changeFrom?.length ? i :`${i} || `)}
                                                </p>

                                            </div>
                                        </td>
                                        <td className="p-3 border-b border-slate-200">
                                            <div className="flex flex-col">
                                                <p className="text-sm font-semibold text-slate-700">
                                                    {item?.changeTo?.map((i,n )=> n + 1 == item?.changeTo?.length ? i :`${i} || `)}
                                                </p>

                                            </div>
                                        </td>
                                        <td className="p-3 border-b border-slate-200">
                                            <div className="w-max">
                                                <div className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap  ${item?.action == 'Approve' ? 'text-green-900 bg-green-500/20' : item?.action == 'Reject' ? 'text-red-900 bg-red-500/20' : 'text-ornge-900 bg-orange-500/20'}`}>
                                                    <span className={`px-2 py-1 text-xs rounded-full font-semibold flex items-center gap-1`}>
                                                        {item.action}
                                                    </span>
                                                </div>
                                            </div>
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
        </div>
    );
}
