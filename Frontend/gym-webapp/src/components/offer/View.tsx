import React from 'react'
import { CrudAction } from '../../utils/CrudAction'

export default function OfferView(props: {action: CrudAction}) {
  return (
    <div className="container border rounded p-4 mt-4">
    <form>
      <div className='row mb-3'>
        <div className='form-group col'>
          <label htmlFor="name">Nazwa oferty:</label>
          <input type="text" name="name" id="name" className='form-control' placeholder='Oferta'/>
        </div>
      </div>
      <div className='row mb-3'>
        <div className='form-group col'>
          <label htmlFor="offer">Treść oferty</label>
          <textarea rows={4} name="offer" id="offer" className='form-control' placeholder='Tu wprowadź treść oferty' />
        </div>
      </div>
      <div className='row mb-3'>
        <div className='form-group col'>
          <label htmlFor="price">Cena:</label>
          <input type="number" name="price" id="price" className='form-control' placeholder='100.99' step={0.01} min="0"/>
        </div>
      </div>
      <div className='form-check'>
        <label className="form-check-label" htmlFor="active">Wyświetlaj wśród ofert</label>
        <input className="form-check-input" type="checkbox" name="active" id="active"/>
      </div>
      {/* <input type="submit" value="Zaloguj" className='btn btn-primary'/> */}
    </form>
  </div>
  )
}
