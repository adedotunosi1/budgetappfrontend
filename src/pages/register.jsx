import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const currentUser = JSON.parse(localStorage.getItem("userName"));

const RegisterUser = () => {
   const [fullname, setFullName] = useState("");
   const [password, setPassword] = useState("");
   const [email, setEmail] = useState("");
   const [username, setUsername] = useState("");
   const [errorMessage, setErrorMessage] = useState("");
   const Navigate = useNavigate();
  function handlePassword(event) {
     let new_pass = event.target.value;
     setPassword(new_pass);

     // regular expressions to validate password
     var lowerCase = /[a-z]/g;
     var upperCase = /[A-Z]/g;
     var numbers = /[0-9]/g;
     if (!new_pass.match(lowerCase)) {
        setErrorMessage("Password should contains lowercase letters!");
     } else if (!new_pass.match(upperCase)) {
        setErrorMessage("Password should contain uppercase letters!");
     } else if (!new_pass.match(numbers)) {
        setErrorMessage("Password should contains numbers also!");
     } else if (new_pass.length < 8) {
        setErrorMessage("Password length should be more than 8.");
     } else {
        setErrorMessage("Password is strong!"); 
     }
  }


const handleformsubmit = (e) => {
    e.preventDefault();

    const reg = {fullname, username, password, email};

    fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(reg)
    }).then(() => {
      console.log(reg);
      Navigate('/login');
      toast.success('Registration Successful')
    }).catch((error) => {
      toast.error('Change Username and retry');
    })

}
   return ( 
        
        <><h1 style={{
         marginBottom: '10px'
        }}>Complete your registration, <span className="accent">{currentUser}</span></h1><div>
         <div className="form-wrapper">
            <form onSubmit={handleformsubmit}>
             <div className="signup-header">
             </div>
             <div id="recaptcha-container"></div>
             <div className="form-body">
             <label>Full Name:</label>
             <input value={fullname} placeholder="What is your full name?" type="text" required onChange={(e) => setFullName(e.target.value)} />
             <label>Username</label>
             <input value={username} required  onChange={(e) => setUsername(e.target.value)} type="text"/>
             <label>Password</label>
             <input value={password} type="password" required onChange={handlePassword}/>
             <div style = {{ color: "red" }}> {errorMessage} </div>
             <label> Email </label>
             <input value={email} type="email" required onChange={(e) => setEmail(e.target.value)}/>
             </div>
             <div className="form-footer">
                <button style={{
                  marginTop: '10px'
                }} type="submit" className="btn btn--dark"> Register </button> 
             </div>
             <button style={{
                  marginTop: '10px'
                }} type="submit" className="btn btn--white"> <Link to={'/login'}> Login </Link></button>
            </form>
            </div>
        </div></>
     );
}
 
export default RegisterUser;