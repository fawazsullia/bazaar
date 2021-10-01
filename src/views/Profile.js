import React,{useState} from 'react'
import * as profileStyle from './styles/profile.module.css'
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../state/actionCreators/index";
import { bindActionCreators } from "redux";
import firebase from '../firebaseConfig'
import { order } from '../state/actionCreators/actionCreators';

function Profile() {

    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const { setProduct, setUserOnRegister } = bindActionCreators(actionCreators, dispatch);
    const [displayName, setdisplayName] = useState(state.currentUser.displayName)
    const [address, setaddress] = useState(state.currentUser.address)
    const [edit, setedit] = useState(false)
    const [saving, setsaving] = useState(false)

    const saveProfile = () => {
        setsaving(true)
        setedit(false)
        fetch('https://bazaar-back.herokuapp.com/user/edit', {

        method : 'PUT',
        headers : {
            'content-type' : 'application/json'
        },
        body : JSON.stringify({ uid : state.currentUser.uid, address : address, displayName : displayName    })
        })
        .then((res)=> res.json())
        .then((response)=> { if(!response.status){ alert("Could not save at this moment");  }; setsaving(false);     })
        .catch((err)=> { alert("Could not save at this time"); setsaving(false)   })
    }

    const deleteUser= () => {

            const user = firebase.auth().currentUser
            console.log(user)
            
                firebase.auth().currentUser.delete().then(() => {
                    

                    fetch(`https://bazaar-back.herokuapp.com/user/${state.currentUser.uid}`,{
                    
                    method : 'DELETE',
                    
                    })
                    .then(()=>{ localStorage.removeItem("userUid"); window.location.replace("http://localhost:3000")     } )
                    
                    
                    }).catch((error) => {
                      alert("An error occured")
                    });
                    
                    


           
        


    }


    return (
        <div className={profileStyle.container}>

            <div className={profileStyle.personalInfo}>
                <h3>Personal Information</h3>
                <form>
                <label>Display Name: </label>
                <input type="text" style={{outline : edit ? "1px solid red" : "none"}} readOnly={!edit} value={displayName} onChange={(e)=>{ setdisplayName(e.target.value)   }} /><br />
                <label>Shipping Address: </label>
                <textarea style={{outline : edit ? "1px solid red" : "none"}} value={address} readOnly={!edit} onChange={(e)=>{ setaddress(e.target.value)   }}  /><br/>
                </form>
                <p>Email : {state.currentUser.email}</p>
                <button style={{backgroundColor : "green"}} type="button" onClick={saveProfile}>{ saving ? "Saving..." : "Save"}</button>
                <button style={{backgroundColor : "indianred"}} type="button" onClick={()=> {setedit(true)}}>edit</button>
            </div>



            <div className={profileStyle.orders}>
                <h3>Orders</h3>

               { state.currentUser.orders.map((order)=> {
               
               return(
               <div className={profileStyle.card}>
                <div className={profileStyle.cardTop}>
                    <p>Date : {order.date}</p>
                    <p>Total : $ {order.total}</p>
                </div>
                <div className={profileStyle.cardBottom}>
                    <img src={order.image} />
                    <div>
                        <p>{order.title}</p>
                        <p>Count : {order.count}</p>
                    </div>
                    <p>{order.status}</p>
                </div></div>)
}) }

            </div>

        <div className={profileStyle.dangerSection}>

        <h3>Delete Account</h3>
        <p>Clicking on this button will permanently delete your account. Any saved data will be lost</p>
        <button type="button" onClick={deleteUser}>Delete Account</button>

        </div>

        </div>
    )
}

export default Profile
