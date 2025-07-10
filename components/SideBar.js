import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

const SideBar = ({ path }) => {
    const router = useRouter()
    const logout = async () => {
        const res = await fetch('/api?logout', { method: 'POST' });
        router.push('/login');
        if (res.ok) {
            toast.success('Logout successful!');
        }
    }

    return (
        <>
            <div className=" w-[80px] flex bg-gray-200">
                <aside className="flex flex-col items-center bg-white text-gray-700 shadow h-full">

                    <div className="h-16 flex items-center w-full">
                        <span className="h-6 w-6 mx-auto">
                            <img className="h-6 w-6 mx-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/512px-Svelte_Logo.svg.png" alt="svelte logo" />
                        </span>
                    </div>
                    <ul>
                        <li className={`${path == '/home' ? 'bg-gray-100' : ''} hover:bg-gray-100`} onClick={() => router.push('/home')} title='Audit'>
                            <span className="h-16 px-6 flex justify-center items-center w-full focus:text-orange-500 cursor-pointer" title='Home' >
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                                    <path d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M15 18H9" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                                </svg>
                            </span>
                        </li>

                        <li className={`${path == '/audit' ? 'bg-gray-100' : ''} hover:bg-gray-100`} onClick={() => router.push('/audit')} title='Audit'>
                            <span
                                className="h-16 px-6 flex justify-center items-center w-full focus:text-orange-500 cursor-pointer" >
                                <svg className="h-5 w-5" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3,12.2928932 L3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 C9.83094568,21 7.7795552,20.2294045 6.16280756,18.8505586 C5.45850266,18.2498909 4.84967664,17.5439447 4.359624,16.7587075 C4.21342347,16.5244426 4.2848137,16.2160145 4.51907855,16.069814 C4.75334339,15.9236134 5.06177151,15.9950037 5.20797204,16.2292685 C5.64372413,16.9274972 6.1852566,17.5554151 6.81171475,18.089691 C8.24914371,19.3156047 10.071062,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 L4,12.2928932 L5.14644661,11.1464466 C5.34170876,10.9511845 5.65829124,10.9511845 5.85355339,11.1464466 C6.04881554,11.3417088 6.04881554,11.6582912 5.85355339,11.8535534 L3.85355339,13.8535534 C3.65829124,14.0488155 3.34170876,14.0488155 3.14644661,13.8535534 L1.14644661,11.8535534 C0.951184464,11.6582912 0.951184464,11.3417088 1.14644661,11.1464466 C1.34170876,10.9511845 1.65829124,10.9511845 1.85355339,11.1464466 L3,12.2928932 Z M15.6969596,13.0404275 C15.9507745,13.1492053 16.0683503,13.4431448 15.9595725,13.6969596 C15.8507947,13.9507745 15.5568552,14.0683503 15.3030404,13.9595725 L11.8030404,12.4595725 C11.6717691,12.4033134 11.5708217,12.2936038 11.5256584,12.1581139 L10.0256584,7.65811388 C9.93833446,7.39614222 10.0799145,7.11298224 10.3418861,7.02565835 C10.6038578,6.93833446 10.8870178,7.07991446 10.9743416,7.34188612 L12.4033381,11.6288754 L15.6969596,13.0404275 Z" />
                                </svg>
                            </span>
                        </li>

                        <li className="hover:bg-gray-100" onClick={logout} title='Logout'>
                            <span
                                className="h-16 px-6 flex justify-center items-center w-full focus:text-orange-500 cursor-pointer" >
                                <svg className="h-5 w-5 text-red-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path> <polyline points="16 17 21 12 16 7"></polyline> <line x1="21" y1="12" x2="9" y2="12"></line>
                                </svg>
                            </span>
                        </li>
                    </ul>
                </aside>
            </div>
        </>
    )
}

export default SideBar