import { useState } from "react";
import { HiMenuAlt4 } from 'react-icons/hi';
import { SiEthereum } from 'react-icons/si';
import { AiOutlineClose } from 'react-icons/ai';

const NavigationBarItem = ({ title, classProps }) => {
    return (
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            { title }
        </li>
    )
}

const NavigationBar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    
    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div className="md:flex-[0.5] flex-initial justify-center items-center">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                    <SiEthereum fontSize={28} className="text-white cursor-pointer"/>
                </div>
            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {["Market", "Exchange", "Pool", "Vote"].map((item, index) => (
                    <NavigationBarItem key={item + index} title={item} />
                ))}
                <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                    Login
                </li>
            </ul>
            <div className="flex relative">
                {!toggleMenu && (
                    <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
                )}
                {toggleMenu && (
                    <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
                )}
                {toggleMenu && (
                <ul
                    className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                    flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
                >
                    <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
                    {
                        ["Market", "Exchange", "Pool", "Vote"].map((item, index) => 
                            <NavigationBarItem key={item + index} title={item} classprops="my-2 text-lg" />
                        )
                    }
                </ul>
                )}
            </div>
        </nav>
    )
}

export default NavigationBar;