import React from 'react'

export default function PasswordRecovery() {
  return (
    <div className='login-container'>
      <div className='recovery-message'>
        Podaj swoją nazwę użytkownika oraz przypisany do niego e-mail, by otrzymać wiadomość do resetu hasła
      </div>
      <div className='form-container'>
        <form>
          <label htmlFor="username">Nazwa użytkownika:</label><br/>
          <input type="text" name="username" id="username" /><br/>
          <label htmlFor="password">E-mail:</label><br/>
          <input type="email" name="email" id="email" /><br/>
          <input type="submit" value="Wyślij"/>
        </form>
      </div>
    </div>
  )
}
