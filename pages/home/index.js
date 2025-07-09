import ListTable from '@/components/ListTable'
import SideBar from '@/components/SideBar'
import React from 'react'

const page = ({data}) => {
    return (
        <>
            <div className="flex flex-wrap bg-gray-200 w-full h-screen">
                <SideBar />
                <div className=" my-5 bg-gray-200 overflow-auto" style={{ width: 'calc(100% - 80px)' }}>
                    <ListTable dataList = {data} />
                </div>
            </div>
        </>
    )
}

export default page

export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:3000/api');
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();

    return { props: { data } };
  } catch (error) {
    return { props: { data: [] } }; // or redirect to error page
  }
}