import SideBar from '@/Component/SideBar'
import Table from '@/Component/Table'
import React from 'react'

// async function getProducts() {
//   const res = await fetch('http://localhost:3000/api/cars', { cache: 'no-store'});
//   return res.json();
// }

const page = async () => {
// const data =  await getProducts()
    return (
        <>
            <div className="flex flex-wrap bg-gray-200 w-full h-screen">
                <SideBar />
                <div className=" my-5 bg-gray-200 overflow-auto" style={{ width: 'calc(100% - 80px)' }}>
                    <Table  />
                </div>
            </div>
        </>
    )
}

export default page