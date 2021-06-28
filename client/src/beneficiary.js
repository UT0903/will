import React ,{Component} from "react";
import ReactDOM from 'react-dom';
import Bank from "./contracts/Bank.json";
import getWeb3 from "./getWeb3";
import "./testa.css";
//import Bank from "./contracts/Bank.json";

/*const Testamentary=()=>{
  const StyleSheet={
      width:"100vw",
      height:"100vh",
      backgroundColor:"#FF2E63",
      display: "flex",
      alignItems:"center",
      justifyContent:"center",
      flexDirection:"column"
  }
  return(
      <div style={StyleSheet}>
          <h1 style={{color:"white",fontFamily:"Microsoft JhengHei"}}>管理遺囑合約</h1>
      </div>
  )
}*/
class beneficiary extends Component{
    //state = { storageValue: 0, web3: null, accounts: null, contract: null,value:''};
    state = { storageValue: 0, web3: null, accounts: null, contract: null};
    constructor(props){
        super(props);
        this.state={password:'',
        address:'',
        email:'',
        account:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    
    componentDidMount() {
        this.loadBlockchainData()
      }
    async handleChange(event){
        const target=event.target;
        const value=target.value;
        const name=target.name;
        this.setState({[name]:value});
    }
    async handleSubmit(event){
        alert('require has been submitted');
        event.preventDefault();
    }
  
    async loadBlockchainData() {
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
              <h1 style={{fontFamily:"Microsoft JhengHei"}}>我是受益人</h1>
              <h2 style={{width:"40vw",fontSize:"15px",fontFamily:"Microsoft JhengHei"}}>Welcome,{this.state.account}</h2>
              <div className="row">
                  <main role="main" className="col-lg-12 d-flex text-center">
                  <div className="content mr-auto ml-auto">
                    <div>
                        <br></br>
                        <form onSubmit={this.handleSubmit}>
                            合約地址:  
                            <input name="address" type="text" size="45" value={this.state.address} onChange={this.handleChange}/><br></br>
                            <br></br>
                            電子郵件:
                            <input name="email" type="email" value={this.state.email} onChange={this.handleChange}/><br></br>
                            <br></br>
                            密碼(請輸入6至12位英數字):
                            <input name="password" type="password" minLength="6" maxLength="12" value={this.state.password} onChange={this.handleChange}/><br></br>
                            <br></br>
                            <button type="submit" className="button">設定</button>   
                            </form>
                        <br></br>       
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
export default beneficiary;