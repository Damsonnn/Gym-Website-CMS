import React from 'react'
import { CrudAction } from '../../utils/CrudAction'

export default function OpinionView(props: {action: CrudAction}) {
  return (
    <div className="container border rounded p-4 mt-4">
    <form>
      <div className='row mb-3'>
        <div className='form-group col'>
          <label htmlFor="reviewer">Autor:</label>
          <input type="text" name="reviewer" id="reviewer" className='form-control' placeholder='Autor opinii'/>
        </div>
      </div>
      <div className='row mb-3'>
        <div className='form-group col'>
          <label htmlFor="reviewer">Opinia:</label>
          <textarea rows={4} name="reviewer" id="reviewer" className='form-control' placeholder='Tu wprowadź opinię' />
        </div>
      </div>
      <div className='form-check'>
        <label className="form-check-label" htmlFor="active">Wyświetlaj na stronie głównej</label>
        <input className="form-check-input" type="checkbox" name="active" id="active"/>
      </div>
      {/* <input type="submit" value="Zaloguj" className='btn btn-primary'/> */}
    </form>
  </div>
  )
}
