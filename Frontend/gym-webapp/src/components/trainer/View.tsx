﻿import { FormEvent, useState, ChangeEvent, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router';
import { CrudAction } from '../../utils/CrudAction'
import { Trainer } from './List';
import { createOrEditRequest, getOneObject } from '../../utils/ApiRequests';
import { refreshInput } from '../../utils/Handlers';

export default function TrainerView(props: {action: CrudAction}) {
  const [action, setAction] = useState<CrudAction>(props.action)
  const [trainerData, setTrainerData] = useState<Trainer>({
    id: 0,
    firstName: "",
    lastName: "",
    age: 0,
    about: "",
    facebookLink: "",
    twitterLink: "",
    instagramLink: "",
    active: false
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const getTrainer = () => {
    if (action != CrudAction.Create) {
      getOneObject(id, "trainers", setTrainerData);
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    refreshInput(event, trainerData, setTrainerData);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createOrEditRequest(action, trainerData, id, "trainers", navigate);
  };

  useEffect(() => {
    getTrainer()
  }, []);

  return (
    <div className="container border rounded p-4 mt-4">
      <form>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="firstName">Imię:</label>
            <input type="text" name="firstName" id="firstName" className='form-control' placeholder='Imię' onChange={handleInputChange} value={trainerData.firstName} disabled={action === CrudAction.View}/>
          </div>
          <div className='form-group col'>
            <label htmlFor="firstName">Nazwisko:</label>
            <input type="text" name="firstName" id="firstName" className='form-control' placeholder='Nazwisko' onChange={handleInputChange} value={trainerData.lastName} disabled={action === CrudAction.View}/>
          </div>
        </div>
        {/* <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="email">E-mail:</label>
            <input type="email" name="email" id="email" className='form-control' placeholder='E-mail' onChange={handleInputChange} value={trainerData.email} disabled={action === CrudAction.View}/>
          </div>
          <div className='form-group col'>
            <label htmlFor="birthdate">Data urodzenia:</label>
            <input className="form-control" type="date" name="birthdate" id="birthdate"/>
          </div>
        </div> */}
        <div className='form-group mb-3'>
          <label htmlFor="facebookLink">Link do Facebooka:</label>
          <input type="text" name="facebookLink" id="facebookLink" className='form-control' placeholder='facebook.com/uzytkownik' onChange={handleInputChange} value={trainerData.facebookLink} disabled={action === CrudAction.View}/>
        </div>
        <div className='form-group mb-3'>
          <label htmlFor="instagramLink">Link do Instagrama:</label>
          <input type="text" name="instagramLink" id="instagramLink" className='form-control' placeholder='instagram.com/uzytkownik' onChange={handleInputChange} value={trainerData.instagramLink} disabled={action === CrudAction.View}/>
        </div>
        <div className='form-group mb-3'>
          <label htmlFor="twitterLink">Link do Twittera:</label>
          <input type="text" name="twitterLink" id="twitterLink" className='form-control' placeholder='twitter.com/uzytkownik' onChange={handleInputChange} value={trainerData.twitterLink} disabled={action === CrudAction.View}/>
        </div>
        <div className='form-group mb-3'>
          <label htmlFor="about">O trenerze:</label>
          <input type="text" name="about" id="about" className='form-control' placeholder='Opowiedz coś' onChange={handleInputChange} value={trainerData.about} disabled={action === CrudAction.View}/>
        </div>
        <div className='form-check mb-3'>
          <label className="form-check-label" htmlFor="active">Wyświetlaj na stronie głównej</label>
          <input className="form-check-input" type="checkbox" name="active" id="active" onChange={handleInputChange} checked={trainerData.active} disabled={action === CrudAction.View}/>
        </div>
        {action === CrudAction.Create ? <input type="submit" value="Utwórz" className='btn btn-primary' /> : null}
        {action === CrudAction.Edit ? <input type="submit" value="Zapisz" className='btn btn-primary' /> : null}
      </form>
    </div>
  )
}
