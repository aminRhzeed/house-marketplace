import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import { ReactComponent as VisibilityIcon } from '../assets/svg/visibilityIcon.svg'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const { name, email, password } = formData
  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">
            Welcome Back!
          </p>
        </header>
        <form>
          
          <input 
            type="text" 
            className="nameInput" 
            placeholder="FullName" 
            id="name" 
            value={name} 
            onChange={onChange} 
          />

          <input 
            type="email" 
            className="emailInput" 
            placeholder="Email" 
            id="email" 
            value={email} 
            onChange={onChange} 
          />

          <div className="passwordInputDiv">
            <input 
              type={showPassword ? 'text' : 'password'} 
              className="passwordInput" 
              placeholder="Password" 
              id="password" 
              value={password} 
              onChange={onChange} />
            <VisibilityIcon
              className="showPassword" 
              onClick={() => setShowPassword((prevState) => !prevState)} 
            />
          </div>

          <Link to='/forgot-password' className="forgotPasswordLink">Forgot Password</Link>

          <div className="signUpBar">
            <button className="signUpButton">
              Sign up
              <ArrowRightIcon fill='#fff' />
            </button>
          </div>
        </form>

        {/* Google Auth */}

        <Link to='/sign-in' className="registerLink">Sign In Instead</Link>
      </div>

    </>
  )
}

export default SignUp
