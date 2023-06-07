import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserLogin = () => {

const username = JSON.parse(localStorage.getItem("userName"));
const [id, setUsername] = useState('');
const [password, setPassword] = useState('');
const Navigate = useNavigate();
const handleformsubmit = (e) => {
    
    e.preventDefault();
    const reg = {username, password};
        if(validate()){
       
            fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(reg)
              }).then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp);
            if(Object.keys(resp).length === 0){
               toast.error('Please Enter valid username')
            } else {
                if( resp.status === "ok"){
                   toast.success('login successful.');
                   Navigate('/?index');
                   window.localStorage.setItem("token", resp.data);
                   window.localStorage.setItem("loggedIn", true);

                   
                } else {
                    toast.error('Incorrect password')
                }
            }
        }).catch((err)=> {
            toast.error('there is an error to be fixed:');
        })
    }
    }
    const validate = () => {
        let result = true;
         if(username === '' || username == null){
            result = false;
            toast.warning('Username Required');
         }
         if (password === '' || password === null ){
            result = false;
            toast.warning('Password Required')
         }
        return result;
}
   
    return ( 
        <><h2> Login now! </h2><div className="form-wrapper">
            <form onSubmit={handleformsubmit}>
                <div className="signup-header">
                </div>
                <div id="recaptcha-container"></div>
                <div className="form-body">
                    <label>Username</label>
                    <input value={username} required onChange={(e) => setUsername(e.target.value)} type="text" />
                    <label>Password</label>
                    <input value={password} type="password" required onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-footer">
                    <button style={{
                  marginTop: '10px'
                }} type="submit" className="btn btn--dark"> Login </button>
                </div>
                <button style={{
                  marginTop: '10px'
                }} type="submit" className="btn btn--white"> <Link to={'/register'}> Register </Link></button>
            </form>
        </div></>
     );
}
 
export default UserLogin;