import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const Register = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const[username, setUsername] = useState<string>("");
    const[email, setEmail] = useState<string>("");
    const[password, setPassword] = useState<string>("");


    const handleSubmit =async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try {
            const res = await fetch("https://stockify-store-management.vercel.app/register", {
                method: "POST",
                headers: {
                 "Content-Type": "application/json"
                 },
                 body: JSON.stringify({email, username, password})
             });
     
             const data = await res.json();
             console.log(data);
             if(res.ok){
                 if(data){
                     enqueueSnackbar(`${data.message}`, {variant: "success"})
                     navigate("/login")
                 }
             }else{
                 const error = data?.message || "Something went wrong";
                 enqueueSnackbar(error, {variant: "error"})
         }
        } catch (err) {
            const error = "Failed to reach the server. Please try again later.";
            enqueueSnackbar(error, { variant: 'error', autoHideDuration:1500 });
        }
        setPassword("");
        setEmail("");
        setUsername("");      

}
  return (
    <div className="login-container">
    <h1>Stockify</h1>
    <p>Register to manage and view user sales</p>
    <form onSubmit={handleSubmit}>
      <label>
        email
        <input 
          type="email" 
          name="email" 
          value={email}
          onChange={(e) =>setEmail(e.target.value)}
          required />
      </label>
      <label>
        username
        <input 
          type="text" 
          name="username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required />
      </label>
      <label>
        Password
        <input  
          type="password" 
          name="password" 
          value={password}
          onChange={(e) =>setPassword(e.target.value)}
          required />
      </label>
      <div className='register_div'>
            <p>
                <Link to={"/privacy_policy"}>
                    Private Policy
                </Link>
            </p>
            <p>
              <Link to={"/login"}>
                Alraedy have an Account ?
              </Link>
            </p>
          </div>
      <button type="submit">create account</button>
    </form>
  </div>
  )
}

export default Register