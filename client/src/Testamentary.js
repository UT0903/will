import React ,{Component} from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
//import ReactBootstrap, { Navbar, Container, Nav, Button,  Form, Col, Row} from 'react-bootstrap'
//import {HashRouter,Route,Switch,Link} from "react-router-dom";
import beneficiary from './beneficiary';
import ManageTesta from "./ManageTesta";
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
class Testamentary extends Component{
    componentDidMount() {
        this.loadBlockchainData()
      }
    //state = { storageValue: 0, web3: null, accounts: null, contract: null };
    /*async openBen(){
        const Appa = () =>{
            return( 
                <HashRouter>
                    <switch>        
                            <Route path="/beneficiary" component={beneficiary}/>
                   </switch>
                </HashRouter>
            );
        }
        ReactDOM.render(<Appa />, document.getElementById('root'));

    }*/
    async handleClick(event){
       event.preventDefault();
    }
    async refreshPage(){
        window.location.reload()
    }
  
    async loadBlockchainData() {
      if(typeof window.ethereum!=='undefined'){
        const web3 = await getWeb3();
        const netId = await web3.eth.net.getId()
        this.setState({ netid: netId })
        const accounts = await web3.eth.getAccounts(console.log)
        this.setState({account:accounts[0]})
        
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
  
    constructor(props) {
      super(props)
      this.state = {
        //web3: 'undefined',
        account: '',
        bank: null,
        balance: 0,
        BankAddress: null,
      }
      
  
    }
    
  
    render() {
      //if (!this.state.web3) {
        //return <div>Loading Web3, accounts, and contract...</div>;
      //}
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
              <h1 style={{fontFamily:"Microsoft JhengHei"}}>遺產分配</h1>
              <h2 style={{width:"40vw",fontSize:"15px",fontFamily:"Microsoft JhengHei"}}>Welcome,{this.state.account}</h2>
              <div className="row">
                  <main role="main" className="col-lg-12 d-flex text-center">
                  <div className="content mr-auto ml-auto">
                    <div>
                        <br></br>
                        <a href = "#/beneficiary" className = "button" onclick = {this.handleClick}>我是受益人</a>
                        <br></br>
                        <a href ="#/managetesta" className="button" onclick = {this.handleClick}>建立/修改遺產分配合約</a>
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
export default Testamentary;