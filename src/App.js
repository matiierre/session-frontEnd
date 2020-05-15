import React, { Component } from 'react';
import UserStore from './stores/userStore';
import { observer } from 'mobx-react';
import InputField from './components/inputField';
import LoginForm from './components/loginForm';
import SubmitButton from './components/submitButton';
import './App.css';

class App extends Component {

    async componentDidMount(){
        try{
            let res = await fetch ('isLoggedIn',{
                method:'post',
                headers: {
                    'Accept': 'aplication/json',
                    'Content-Type': 'aplication/json'
                }
            });
            let result = await res.json();

            if (result && result.success){
                UserStore.loading = true;
                UserStore.isLoggedIn = true;
                UserStore.userName = result.username;
            }else{
                UserStore.loading = false;
                UserStore.isLoggedIn= false;
            }
        }
        catch(e){
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
        }
    }
    
    async doLogout(){
        try{
            let res = await fetch ('logout',{
                method:'post',
                headers: {
                    'Accept': 'aplication/json',
                    'Content-Type': 'aplication/json'
                }
            });
            let result = await res.json();
            
            if (result && result.success){
                UserStore.isLoggedIn = false;
                UserStore.userName = '';
            }
        }
        catch(e){
            console.log(e)
        }
    }

    render(){
        
        if(UserStore.loading){
            return(
                <div className="App">
                    <div className="container">
                        Loading, please wait...
                    </div>
                </div>
            );
        }   
        else{

            if(UserStore.isLoggedIn){
                return(
                <div className="App">
                    <div className="container">
                        Welcome {UserStore.userName}
                        <SubmitButton
                            text= {'Log out'}
                            disabled = {false}
                            onClick= { () => this.doLogout()} 
                        />
                    </div>
                </div>
                )
               
            }

            return(
                <div className="App">
                    <div className="container">
                        <LoginForm />
                    </div>
                </div>
            )
        }
        
    }
}


export default observer(App);
