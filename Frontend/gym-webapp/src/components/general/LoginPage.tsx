import React from 'react'
import "../../assets/stylesheets/LoginPage.css"
import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div className='login-container'>
      <div className='form-container'>
        <form>
          <label htmlFor="username">Nazwa użytkownika:</label><br/>
          <input type="text" name="username" id="username" /><br/>
          <label htmlFor="password">Hasło:</label><br/>
          <input type="password" name="password" id="password" /><br/>
          <input type="submit" value="Zaloguj"/>
        </form>
        <Link to="/recovery">Zapomniałem hasła</Link>
      </div>
    </div>
  )
}
