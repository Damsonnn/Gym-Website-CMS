

export default function PasswordRecovery() {
  return (
    <div className='container p-5 login-container'>
      <div className='border rounded p-5'>
        <div className='recovery-message'>
          Podaj swoją nazwę użytkownika oraz przypisany do niego e-mail, by otrzymać wiadomość do resetu hasła
        </div>
        <form className="pt-4">
          <label htmlFor="username">Nazwa użytkownika:</label><br />
          <input type="text" name="username" id="username" className='form-control' placeholder='Nazwa użytkownika' /><br />
          <label htmlFor="email">E-mail:</label><br />
          <input type="email" name="email" id="email" className='form-control' placeholder='E-mail' /><br />
          <input type="submit" value="Wyślij przypomnienie" className='btn btn-primary' />
        </form>
      </div>
    </div>
  )
}
