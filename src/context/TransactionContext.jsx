import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    
    return transactionContract;
}

const initialFormData = { addressTo: '', amount: '', keyword: '', message: '' };

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);
    
    const handleChange = (e, name) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: e.target.value
        }));
    }
    
    const clearFormData =() => {
        setFormData(initialFormData);
    }
    
    const getAllTransactions = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const transactionContract = createEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();
            
            const structuredTransactions = availableTransactions.map(({ receiver, sender, amount, message, keyword, timestamp}) => ({
                addressTo: receiver,
                addressFrom: sender,
                timestamp: new Date(timestamp.toNumber() * 1000).toLocaleString(),
                message,
                keyword,
                amount: Number(ethers.utils.formatEther(amount._hex))
            }));
            
            setTransactions(structuredTransactions);
        } catch (error) {
            console.log(error);
            
            throw new Error('No ethereum Object');
        }
    }
    
    const checkIfWalletIsConnect = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
        
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                
                getAllTransactions();
            } else {
                console.log('No accounts found');
            }
        } catch (error) {
            console.log(error);
            
            throw new Error('No ethereum Object');
        }
        
    }
    
    const checkIfTransactionsExist = async () => {
        try {
            const transactionContract = createEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();
            
            localStorage.setItem('transactionCount', transactionCount);
        } catch (error) {
            console.log(error);
            
            throw new Error('No ethereum Object');
        }
    }
    
    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = createEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
            
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //21000 GWEI
                    value: parsedAmount._hex, 
                }]
            });
            
            const transactionHash = await transactionContract.addToBlockChain(addressTo, parsedAmount, message, keyword);
            
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);
            const transactionCount = await transactionContract.getTransactionCount();
            
            setTransactionCount(transactionCount.toNumber());
            getAllTransactions();
            clearFormData();
        } catch (error) {
            console.log(error);
            
            throw new Error('No ethereum Object');
        }
    }
    
    const connectWallet = async () => {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            
            setCurrentAccount(accounts[0]);
            getAllTransactions();
        } catch (error) {
            console.log(error);
            
            throw new Error('No ethereum Object');
        }
    }
    
    useEffect(() => {
        checkIfWalletIsConnect();
        checkIfTransactionsExist();
    }, []);
    
    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, sendTransaction, handleChange, transactions, isLoading }}>
            { children }
        </TransactionContext.Provider>
    )
}