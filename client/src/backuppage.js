import React ,{Component} from "react";
import ReactDOM from 'react-dom';
import Bank from "./contracts/Bank.json";
import getWeb3 from "./getWeb3";

class backuppage extends Component{
  state = { storageValue: 0, web3: null, accounts: null, contract: null };
  
  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(_dispatch) {
    if(typeof window.ethereum!=='undefined'){
      const web3 = await getWeb3();
      const netId = await web3.eth.net.getId()
      const accounts = await web3.eth.getAccounts(console.log)
      
      // console.log(netId)
      // console.log(accounts[0])
      

      //load balance
      if(typeof accounts[0] !=='undefined'){
        const balance = await web3.eth.getBalance(accounts[0])
        this.setState({account: accounts[0], balance: balance, web3: web3})
      } else {
        window.alert('Please login with MetaMask')
      }

      //load contracts
      try {
        const bank = new web3.eth.Contract(Bank.abi, Bank.networks[netId].address)
        const BankAddress = Bank.networks[netId].address;
        const bb = await bank.methods.getBankBalance().call()
        this.setState({bank: bank, BankAddress: BankAddress, bb})
        
     
      console.log(bb)
      } catch (e) {
        console.log('Error', e)
        window.alert('Contracts not deployed to the current network')
      }
    } else {
      window.alert('Please install MetaMask')
    }
      
  }

  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(5).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };


  // async withdraw(amount) { // 非同步
  //   if(this.state.bank!=='undefined'){ //  check web3 是否已注入到 MetaMask
  //     try{
  //       await this.state.bank.methods.withdraw().send({value: amount.toString(), from: this.state.account})
  //     } catch(e) {
  //       console.log('Error, withdraw: ', e)
  //     }
  //   }
  // }

  /*constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      bank: null,
      balance: 0,
      BankAddress: null,
    }
    this.withdraw = this.withdraw.bind(this)

  }*/
  

  render() {
    /*if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }*/
    return (
      // <div className="App">
      //   <h1>Good to Go!</h1>
      //   <p>Your Truffle Box is installed and ready.</p>
      //   <h2>Smart Contract Example</h2>
      //   <p>
      //     If your contracts compiled and migrated successfully, below will show
      //     a stored value of 5 (by default).
      //   </p>
        
        <div className="container-fluid mt-5 text-center">
            <h1 style={{width:"30vw",fontSize:"15px",fontFamily:"Microsoft JhengHei"}}>Welcome, Barbie</h1>
            <h2 style={{width:"30vw",fontSize:"14px",fontFamily:"Microsoft JhengHei"}}>{this.state.account}</h2>
            <div className="row">
                <main role="main" className="col-lg-12 d-flex text-center">
                <div className="content mr-auto ml-auto">
                  <div>
                      <h2 style={{fontFamily:"Microsoft JhengHei"}}>備援機制</h2>
                      <br></br>
                      <br></br>
                      <br></br>
                  </div>
                </div>
            </main>
          </div>
        </div>
    );
  }
  
}
export default backuppage;
/*const backuppage=()=>{
  const StyleSheet={
      width:"100vw",
      height:"80vh",
      //backgroundColor:"#FF2E63",
      display: "flex",
      alignItems:"center",
      //justifyContent:"center",
      flexDirection:"column"
  }
  return(
      <div style={StyleSheet}>
          <h1 style={{color:"black",fontFamily:"Microsoft JhengHei"}}>備援機制</h1>
          <h3 style={{width:"95vw"}}>Welcome, Barbie</h3>

      </div>
  )
}
export default backuppage;*/
