import React from 'react'
import { CrudAction } from '../../utils/CrudAction'

export default function CategoryView(props: {action: CrudAction}) {
  return (
    <div className="container border rounded p-4 mt-4">
      <form>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="name">Nazwa kategorii:</label>
            <input type="text" name="name" id="name" className='form-control' placeholder='Kategoria'/>
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
