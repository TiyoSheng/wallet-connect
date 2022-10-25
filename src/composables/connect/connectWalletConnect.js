
import connect from "./index";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from 'ethers'
// import { toRaw } from "vue";
export const connectWalletConnect = async () => {
  try {
    const { state } = connect();
    //  Enable session (triggers QR Code modal)
    const provider = new WalletConnectProvider({
      infuraId: 'd10c4ff706c546c485a8d9d92d1e5096',
    });
    console.log(provider.enable())
    await provider.enable();
    console.log(provider)
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const signer = await web3Provider.getSigner();
    const address = await signer.getAddress();
    // state.provider = toRaw(provider)
    state.status = true;
    state.address = address;
    state.chainId = await provider.request({ method: "eth_chainId" });
    console.log(state.chainId);
    provider.on("disconnect", (code, reason) => {
      console.log(code, reason);
      console.log("disconnected");
      state.status = false;
      state.address = "";
      localStorage.removeItem("userState");
    });

    provider.on("accountsChanged", (accounts) => {
       if (accounts.length > 0) {
        state.address = accounts[0];
      }
    });

    provider.on("chainChanged", (chainId) => {
      console.log(chainId);
      state.chainId = chainId
    });
  } catch (err)  {
    console.log(err)
  }
};

export const connectMetaMask = async () => {
  const { state } = connect();
  let provider
  if (window.ethereum) {
    provider = window.ethereum;
    try {
      await window.ethereum.enable();
    } catch (error) {
      console.log('连接失败', error)
    }
  } else if (window.web3) {
    provider = window.web3.currentProvider;
  } else {
    // 处理用户没有metamask的逻辑
    alert('Please install MetaMask')
  }
  let web3Provider = new ethers.providers.Web3Provider(provider);
  const signer = await web3Provider.getSigner();
  const address = await signer.getAddress();

  state.status = true;
  // state.provider = toRaw(provider)
  state.address = address;
  state.chainId = await provider.request({ method: "eth_chainId" });
  console.log(state.chainId);
  provider.on("disconnect", (code, reason) => {
    console.log(code, reason);
    console.log("disconnected");
    state.status = false;
    state.address = "";
    localStorage.removeItem("userState");
  });

  provider.on("accountsChanged", (accounts) => {
    if (accounts.length > 0) {
      state.address = accounts[0];
      console.log(state.address)
    }
  });

  provider.on("chainChanged", (chainId) => {
    console.log(chainId);
    state.chainId = chainId
  });
  console.log(provider)
};

