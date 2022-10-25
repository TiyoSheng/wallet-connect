
import connect from "./index";
const disconnectWallet = async () => {
    const { state } = connect();
    state.status = false;
    state.address = "";
    localStorage.removeItem("userState");
}

export default disconnectWallet;