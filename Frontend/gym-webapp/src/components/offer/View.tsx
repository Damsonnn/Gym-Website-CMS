import { FormEvent, useState, ChangeEvent, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router';
import { CrudAction } from '../../utils/CrudAction'
import { Offer } from './List';
import { createOrEditRequest, getOneObject } from '../../utils/ApiRequests';
import { refreshInput } from '../../utils/Handlers';

export default function OfferView(props: {action: CrudAction}) {
  const [action, setAction] = useState<CrudAction>(props.action)
  const [offerData, setOfferData] = useState<Offer>({
    id: 0,
    name: "",
    price: 0,
    body: "",
    discount: 0,
    active: false
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const getOffer = () => {
    if (action != CrudAction.Create) {
      getOneObject(id, "offers", setOfferData);
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    refreshInput(event, offerData, setOfferData);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createOrEditRequest(action, offerData, id, "offers", navigate);
  };

  useEffect(() => {
    getOffer()
  }, []);

  return (
    <div className="container border rounded p-4 mt-4">
      <form onSubmit={handleSubmit}>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="name">Nazwa oferty:</label>
            <input type="text" name="name" id="name" className='form-control' placeholder='Oferta' onChange={handleInputChange} value={offerData.name} disabled={action === CrudAction.View}/>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="body">Treść oferty</label>
            <input type='text' name="body" id="body" className='form-control' placeholder='Tu wprowadź treść oferty' onChange={handleInputChange} value={offerData.body} disabled={action === CrudAction.View}/>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="price">Cena:</label>
            <input type="number" name="price" id="price" className='form-control' placeholder='100.99' step={0.01} min="0" onChange={handleInputChange} value={offerData.price} disabled={action === CrudAction.View}/>
          </div>
        </div>
        <div className='form-check'>
          <label className="form-check-label" htmlFor="active">Wyświetlaj wśród ofert</label>
          <input className="form-check-input" type="checkbox" name="active" id="active" onChange={handleInputChange} checked={offerData.active} disabled={action === CrudAction.View}/>
        </div>
        {action === CrudAction.Create ? <input type="submit" value="Utwórz" className='btn btn-primary' /> : null}
        {action === CrudAction.Edit ? <input type="submit" value="Zapisz" className='btn btn-primary' /> : null}
      </form>
    </div>
  )
}
