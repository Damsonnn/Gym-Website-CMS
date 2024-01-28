
import { CrudAction } from '../../utils/CrudAction'

export default function UserView(props: {action: CrudAction}) {
  return (
    <div className="container border rounded p-4 m-4">
      <form>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="username">Nazwa użytkownika:</label>
            <input type="text" name="username" id="username" className='form-control' placeholder='Nazwa użytkownika'/>
          </div>
          <div className='form-group col'>
            <label htmlFor="password">Hasło:</label>
            <input type="text" name="password" id="password" className='form-control' placeholder='Hasło'/>
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor="emial">E-mail:</label>
          <input type="email" name="email" id="email" className='form-control' placeholder='E-mail'/>
        </div>
        {/* <input type="submit" value="Zaloguj" className='btn btn-primary'/> */}
      </form>
    </div>
  )
}
