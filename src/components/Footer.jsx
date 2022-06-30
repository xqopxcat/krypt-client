import { SiEthereum } from 'react-icons/si';

const Footer = () => {
    return (
        <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
            <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
                <div className="flex flex-[0.5] justify-center items-center">
                    <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                        <SiEthereum fontSize={28} className="text-white cursor-pointer"/>
                    </div>
                </div>
                <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
                    {["Market", "Exchange", "Pool", "Vote"].map((item, index) => (
                        <p key={ item + index } className="text-white text-base text-center mx-2 cursor-pointer">
                            { item }
                        </p>
                    ))}
                </div>
            </div>
            <div className="flex justify-center items-center flex-col mt-5">
                <p className="text-white text-sm text-center">xqopxcat@gmail.com</p>
            </div>
            <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5" />
            <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
                <p className="text-white text-sm text-center">@text below</p>
                <p className="text-white text-sm text-center">All rights reserved</p>
            </div>
        </div>
    )
}

export default Footer;