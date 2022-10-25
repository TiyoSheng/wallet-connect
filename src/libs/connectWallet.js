 /* eslint-disable */ 
import { ethers } from 'ethers'
export const connectWallet = () => {
  return new Promise(async (resolve, reject) => {
    let web3Provider;
    if (window.ethereum) {
      web3Provider = window.ethereum;
      try {
        await window.ethereum.enable();
      } catch (error) {
        console.log('连接失败', error)
        reject(error);
      }
    } else if (window.web3) {
      web3Provider = window.web3.currentProvider;
    } else {
      // 处理用户没有metamask的逻辑
      alert('Please install MetaMask')
    }
    let web3 = new ethers.providers.Web3Provider(web3Provider);
    resolve(web3);
  })
}

export const contract = (contractAddress, abi, provider) => {
  return new ethers.Contract(contractAddress, abi, provider)
}

