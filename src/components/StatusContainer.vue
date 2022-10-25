<template>
  <div class="hello">
    <h1>Welcome to Your Vue.js Dapp</h1>
    <div v-if="state.status">
       <button  @click="connectUserWallet" class="button">Connected</button>
       <h3>Address: {{state.address}}</h3>
       <h3>ChainId: {{state.chainId}}</h3>
       <button  @click="disconnectUser" class="disconnect__button">Disconnect</button>
    </div>
  
    <div v-else>
      <button @click="connectUserWallet" class="button">connectWalletConnect</button>
      <button @click="connectUserWallet" class="button">connectBitKeep</button>
      <button @click="connectMetaMaskFun" class="button">connectMetaMask</button>
    </div>
  </div>
</template>

<script>
import connect from '../composables/connect/index';
export default {
  name: 'StatusContainer',
  props: {
    msg: String
  },
  setup: () => {
    const { connectWalletConnect, disconnectWallet, connectMetaMask, state } = connect();
    const connectUserWallet = async () => {
      await connectWalletConnect();
    };
    const connectMetaMaskFun = async () => {
      await connectMetaMask();
    }
    const disconnectUser = async() => {
      await disconnectWallet()
    }

    return {
      connectMetaMaskFun,
      connectUserWallet,
      disconnectUser,
      state
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
