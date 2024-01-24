import React from 'react'
import "../../assets/stylesheets/LoginPage.css"
import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div className='container p-5 login-container'>
      <div className='border rounded'>
        <form className='p-5'>
          <label htmlFor="username">Nazwa użytkownika:</label><br/>
          <input type="text" name="username" id="username" className='form-control' placeholder='Nazwa użytkownika'/><br/>
          <label htmlFor="password">Hasło:</label><br/>
          <input type="password" name="password" id="password" className='form-control' placeholder='Hasło'/><br/>
          <input type="submit" value="Zaloguj" className='btn btn-primary'/>
        </form>
      </div>
      <Link to="/recovery">Zapomniałem hasła</Link>
    </div>
  )
}
