﻿import { CrudAction } from '../../utils/CrudAction'

export default function TrainerView(props: {action: CrudAction}) {
  return (
    <div className="container border rounded p-4 mt-4">
      <form>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="firstname">Imię:</label>
            <input type="text" name="firstname" id="firstname" className='form-control' placeholder='Imię'/>
          </div>
          <div className='form-group col'>
            <label htmlFor="lastname">Nazwisko:</label>
            <input type="text" name="lastname" id="lastname" className='form-control' placeholder='Nazwisko'/>
          </div>
        </div>
        <div className='form-group mb-3'>
          <label htmlFor="email">E-mail:</label>
          <input type="email" name="email" id="email" className='form-control' placeholder='E-mail'/>
        </div>
        <div className='form-group mb-3'>
          <label htmlFor="facebook">Link do Facebooka:</label>
          <input type="text" name="facebook" id="facebook" className='form-control' placeholder='facebook.com/uzytkownik'/>
        </div>
        <div className='form-group mb-3'>
          <label htmlFor="instagram">Link do Instagrama:</label>
          <input type="text" name="instagram" id="instagram" className='form-control' placeholder='instagram.com/uzytkownik'/>
        </div>
        <div className='form-group mb-3'>
          <label htmlFor="twitter">Link do Twittera:</label>
          <input type="text" name="twitter" id="twitter" className='form-control' placeholder='twitter.com/uzytkownik'/>
        </div>
        <div className='form-group mb-3'>
          <label htmlFor="birthdate">Data urodzenia:</label>
          <input className="form-control" type="date" name="birthdate" id="birthdate"/>
        </div>
        {/* <input type="submit" value="Zaloguj" className='btn btn-primary'/> */}
      </form>
    </div>
  )
}
