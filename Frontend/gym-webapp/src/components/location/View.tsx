import React from 'react'
import { CrudAction } from '../../utils/CrudAction'

export default function LocationView(props: {action: CrudAction}) {
  return (
    <div className="container border rounded p-4 mt-4">
      <form>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="city">Miasto:</label>
            <input type="text" name="city" id="city" className='form-control' placeholder='Poznań'/>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="address">Ulica:</label>
            <input type="text" name="address" id="address" className='form-control' placeholder='ul. Grunwaldzka 1/2'/>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="phone">Numer telefonu placówki:</label>
            <input className='form-control' type="text" id="phone" name="phone" pattern="[0-9]" placeholder='123123123'/> 
          </div>
          <div className='form-group col'>
            <label htmlFor="emial">E-mail placówki:</label>
            <input type="email" name="email" id="email" className='form-control' placeholder='E-mail'/>
          </div>
        </div>
        {/* <input type="submit" value="Zaloguj" className='btn btn-primary'/> */}
      </form>
    </div>
  )
}
