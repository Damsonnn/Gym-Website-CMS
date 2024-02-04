﻿import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import { FormEvent, useState, ChangeEvent, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router';
import { CrudAction } from '../../utils/CrudAction'
import { Trainer } from './List';
import { createOrEditRequest, getOneObject } from '../../utils/ApiRequests';
import { refreshInput } from '../../utils/Handlers';
import axios from "axios";
import { config } from "../../utils/JWTConfig";


export default function TrainerView(props: {action: CrudAction}) {
  const [editorState, setEditorState] = useState<EditorState>();
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

  const getTrainer = async () => {
    if (action != CrudAction.Create) {
      try {
        await axios.get(`http://localhost:8080/api/trainers/${id}`, config).then(response => {
            console.log(response)
            if (response.status === 200) {
                setTrainerData(response.data)
                setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(response.data["about"]))))
            }
            else {
                console.log("Could not get data");
            }
          })
    } catch (error) {
        console.error('Error during fetching:', error);
    }
      // getOneObject(id, "trainers", setTrainerData);
    }
  }

  const onEditorStateChange = (newState: EditorState) => {
    console.log(newState)
    setEditorState(newState);
    // console.log(newState.getCurrentContent().toString());
    setTrainerData({...trainerData, ["about"]: JSON.stringify(convertToRaw(newState.getCurrentContent()))});
    console.log(trainerData)
  };

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
      <form onSubmit={handleSubmit}>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="firstName">Imię:</label>
            <input type="text" name="firstName" id="firstName" className='form-control' placeholder='Imię' onChange={handleInputChange} value={trainerData.firstName} disabled={action === CrudAction.View}/>
          </div>
          <div className='form-group col'>
            <label htmlFor="lastName">Nazwisko:</label>
            <input type="text" name="lastName" id="lastName" className='form-control' placeholder='Nazwisko' onChange={handleInputChange} value={trainerData.lastName} disabled={action === CrudAction.View}/>
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
          <Editor
            readOnly={action === CrudAction.View}
            editorState={editorState}
            wrapperClassName="border rounded p-2"
            editorClassName="border rounded p-2"
            onEditorStateChange={onEditorStateChange}
          />
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
