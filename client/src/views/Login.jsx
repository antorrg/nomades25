import {useState} from 'react'
import {useAuth} from '../Auth/AuthContext'
import {useNavigate}from "react-router-dom" ;
import { ValidLogin } from '../utils/Validate';
import {loginUser} from '../Endpoints/endpoints'
import AlertLogin from '../components/AlertLogin'
import Loading from '../components/Loading'
//import './styles/login.css'
//import './styles/forms.css'

const Login = () => {
  const navigate = useNavigate()
  const {login, authenticated, logout}=useAuth();
  const [load, setLoad]= useState(false)
  const [showPassword, setShowPassword]= useState(false)

  const closeLogin = ()=>{navigate('/')}
  const succesLogin = ()=>{
    setLoad(false)
    navigate('/admin')
  }
  const loginReject = ()=>{
    setLoad(false)
  }

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
    setError({
      ...error,
      [name]: ValidLogin({ ...input, [name]: value })[name],
    });
  }
  
  const handleSubmit = async(event)=>{
    event.preventDefault();
    setLoad(true)
    try {
      const response = await loginUser(input,null, loginReject);
      console.log(response)
        const token = response.token;
        const user = response.user;
        login(user, token);
        succesLogin()
    } catch (error) {
      console.error(error)
    }
    
    setInput({
      email: "",
      password: "",
    });
  }
  const permit= (!input.email.trim() ||!input.password.trim() ||error.email|| error.password)? true :false;

   
  return (
    <>
  <div className="imageBack">
    <div className='coverBack'>
      <div className="container-md modal-content colorBack loginContainer rounded-4 shadow">
        {load?
        <Loading/>
        :
        <div className="form-signin m-auto p-3">
          {authenticated?
          <AlertLogin logout={logout}/>
          :
          <section>
            <div className="d-flex justify-content-between align-items-center">
              <img className="mb-4" src="/nomadesFav.png" alt="" width="95" height="57"/>
              <button type="button" onClick={closeLogin}className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <h1 className="h3 mb-3 fw-normal">Inicie sesion</h1>
            <div className="form-floating">
               <input type="email" className="form-control" value={input.email} name="email" placeholder="name@example.com"onChange={(event) => handleChange(event)}/>
               <label htmlFor="floatingInput">Email address</label>
               {error.email && <p className='errorMsg'>{error.email}</p>}
            </div>
            <div className="form-floating d-flex justify-content-between align-items-center">
              <input type={showPassword ? 'text' : 'password'} className="form-control" value={input.password} name="password" placeholder="Password" onChange={(event) => handleChange(event)} />
              <label htmlFor="floatingPassword">Password</label>
              <button type= 'button' onClick={()=>{setShowPassword(!showPassword)}} className='buttonEye'>
                <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
              </button>
              {error.password && <p className='errorMsg'>{error.password}</p>}
            </div>
            <button className="btn btn-primary w-100 py-2" onClick={handleSubmit} disabled={permit}>Iniciar</button>
            <br></br>
            <br></br>
            <br></br>
          </section>
                  }
        </div>
        }
      </div>
    </div>
  </div>
  </>
  );
};

export default Login;
