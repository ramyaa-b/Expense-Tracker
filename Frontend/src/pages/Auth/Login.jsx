import React, {useState} from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import {useNavigate} from 'react-router-dom'
import Input from '../../components/Inputs/Input'
const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {}
    return (
     <AuthLayout>
        <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
          <p className="text-sm text-slate-700 mt-[5px] mb-6">
            Please enter your details to log in 
          </p>

          <form onSubmit={handleLogin}>
            <Input
               value ={email}
               onChange={({target}) => setEmail(target.value)}
               label="Email Address"
               placeholder="example@gmail.com"
               type="text"
            />
            <Input
               value ={password}
               onChange={({target}) => setPassword(target.value)}
               label="Password"
               placeholder="Min 8 Characters"
               type="text"
            />
            {/* {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
            <button
              type="submit" className="btn-primary">
                LOGIN
              </button>
              
              <p className ="text-[13px] text-slate-800 mt-3">
                Dont have an account?{" "}
                <link className="font-medium text-primary underline" to="/signup">
                    Sign Up
                </link>
              </p> */}

          </form>


        </div>
      
     </AuthLayout>
    )
}

export default Login
