import { FormEvent, useState, ChangeEvent, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router';
import { CrudAction } from '../../utils/CrudAction'
import { Location } from './List'
import { createOrEditRequest, getOneObject } from '../../utils/ApiRequests';
import { refreshInput } from '../../utils/Handlers';

export default function LocationView(props: {action: CrudAction}) {
  const [action, setAction] = useState<CrudAction>(props.action)
  const [locationData, setLocationData] = useState<Location>({
    id: 0,
    city: "",
    address: "",
    phoneNumber: "",
    email: ""
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const getLocation = () => {
    if (action != CrudAction.Create) {
      getOneObject(id, "locations", setLocationData);
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    refreshInput(event, locationData, setLocationData);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createOrEditRequest(action, locationData, id, "locations", navigate);
  };

  useEffect(() => {
    getLocation()
  }, []);


  return (
    <div className="container border rounded p-4 mt-4">
      <form onSubmit={handleSubmit}>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="city">Miasto:</label>
            <input type="text" name="city" id="city" className='form-control' placeholder='Poznań' onChange={handleInputChange} value={locationData.city} disabled={action === CrudAction.View}/>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="address">Ulica:</label>
            <input type="text" name="address" id="address" className='form-control' placeholder='ul. Grunwaldzka 1/2' onChange={handleInputChange} value={locationData.address} disabled={action === CrudAction.View}/>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="phoneNumber">Numer telefonu placówki:</label>
            <input className='form-control' type="text" id="phoneNumber" name="phoneNumber" pattern="[0-9]*" placeholder='123123123' onChange={handleInputChange} value={locationData.phoneNumber} disabled={action === CrudAction.View}/> 
          </div>
          <div className='form-group col'>
            <label htmlFor="emial">E-mail placówki:</label>
            <input type="email" name="email" id="email" className='form-control' placeholder='E-mail' onChange={handleInputChange} value={locationData.email} disabled={action === CrudAction.View}/>
          </div>
        </div>
        {action === CrudAction.Create ? <input type="submit" value="Utwórz" className='btn btn-primary' /> : null}
        {action === CrudAction.Edit ? <input type="submit" value="Zapisz" className='btn btn-primary' /> : null}
      </form>
    </div>
  )
}
