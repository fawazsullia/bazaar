import React, {useState} from 'react'
import firebase from '../firebaseConfig'
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../state/actionCreators/index";
import { bindActionCreators } from "redux";

import * as afterRegisterStyle from './styles/afterRegister.module.css'
import { Redirect } from 'react-router-dom';

function AfterRegister() {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { setUserOnRegister } = bindActionCreators(actionCreators, dispatch);

const [name, setname] = useState("")
const [address, setaddress] = useState("")
const [redirect, setredirect] = useState(false)
const [saving, setsaving] = useState(false)
const [errorMessage, seterrorMessage] = useState("")

//save userinfo on firebase database
const saveInfo =() => {
if(name === "" || address === ""){ seterrorMessage("Fields cannot be empty")    }
else{
  setsaving(true)
firebase.auth().onAuthStateChanged((user)=>{
const email = user.email;
const uid = user.uid;

const data =  {displayName: name,
email: email,
address : address,
uid : uid,
signedIn : true,
cart : [],
orders : []
}

firebase.database().ref('users/' + uid).set(data)
  .then(()=> { setUserOnRegister(data); setsaving(false); setredirect(true) })
  .catch((err)=>{ setsaving(false); seterrorMessage(err.message)  })


})}



}



    return (

      redirect ? <Redirect to="/" />:<div className={afterRegisterStyle.container}>
        <div className={afterRegisterStyle.formContainer}>
      <form className={afterRegisterStyle.form}>
        <h2>Spare some details?</h2>
        <input type="text" placeholder="Display Name" value={name} onChange={(e)=>{setname(e.target.value)}} ></input>
        <br />
        <textarea placeholder="Enter your shipping address" value={address} onChange={(e)=>{setaddress(e.target.value)}} />
        <p>{errorMessage}</p>
        <br />
        <button type="button" onClick={saveInfo}>{ saving ? "Saving..." : "Save"}</button>
      </form>
      </div>
    
        </div>
    )
}

export default AfterRegister
