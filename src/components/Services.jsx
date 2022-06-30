import { BsShieldFillCheck } from 'react-icons/bs';
import { RiExchangeLine } from 'react-icons/ri';
import { MdShutterSpeed } from 'react-icons/md';

const ServiceCard = ({ color, title, icon, subtitle}) => (
    <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
            { icon }
        </div>
        <div className="ml-5 flex flex-col flex-1">
            <h3 className="mt-2 text-white text-lg">
                { title }
            </h3>
            <p className="mt-1 text-white text-sm md:w-9/12">
                { subtitle }
            </p>
        </div>
    </div>
);

const Services = () => {
    return (
        <div className="flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services">
            <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
                <div className="flex-1 flex flex-col justify-start items-start">
                    <h1 className="text-white text-3xl sm:text-5xl py-2">
                        Blockchain
                        <br />
                        continue to improve
                    </h1>
                </div>
                <div className="flex-1 flex flex-col justify-start items-center">
                    <ServiceCard
                        color="bg-[#2952E3]"
                        title="Security gurantee"
                        icon={ <BsShieldFillCheck fontSize={24} className="text-white" /> }
                        subtitle="Blockchain technology produces a structure of data with inherent security qualities."
                    />
                    <ServiceCard
                        color="bg-[#8945F8]"
                        title="Exchange"
                        icon={ <RiExchangeLine fontSize={24} className="text-white" /> }
                        subtitle="A crypto exchange is a marketplace where you can buy and sell cryptocurrencies"
                    />
                    <ServiceCard
                        color="bg-[#F84550]"
                        title="Decentralized transactions"
                        icon={ <MdShutterSpeed fontSize={24} className="text-white" /> }
                        subtitle="Blockchains are best known for maintaining a secure and decentralized record of transactions."
                    />
                </div>
            </div>
        </div>
    )
}

export default Services;