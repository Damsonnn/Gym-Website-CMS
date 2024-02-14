﻿import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import { FormEvent, useState, ChangeEvent, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router';
import { CrudAction } from '../../../utils/CrudAction'
import { Trainer } from './List';
import { createOrEditRequest, getOneObject } from '../../../utils/ApiRequests';
import { refreshInput } from '../../../utils/Handlers';


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

  const setDataHelper = (data: Trainer) => {
    setTrainerData(data);
    setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(data.about))));
  };

  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
    setTrainerData({...trainerData, ["about"]: JSON.stringify(convertToRaw(newState.getCurrentContent()))});
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    refreshInput(event, trainerData, setTrainerData);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createOrEditRequest(action, trainerData, id, "trainers", navigate);
  };

  useEffect(() => {
    getOneObject(id, "trainers", setDataHelper);
  }, []);

  return (
    <div className="container border rounded p-4 mt-4">
      <form onSubmit={handleSubmit}>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="firstName">First name:</label>
            <input type="text" name="firstName" id="firstName" className='form-control' placeholder='John' onChange={handleInputChange} value={trainerData.firstName} disabled={action === CrudAction.View}/>
          </div>
          <div className='form-group col'>
            <label htmlFor="lastName">Last name:</label>
            <input type="text" name="lastName" id="lastName" className='form-control' placeholder='Smith' onChange={handleInputChange} value={trainerData.lastName} disabled={action === CrudAction.View}/>
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
          <label htmlFor="facebookLink">Link to Facebook:</label>
          <input type="text" name="facebookLink" id="facebookLink" className='form-control' placeholder='facebook.com/user' onChange={handleInputChange} value={trainerData.facebookLink} disabled={action === CrudAction.View}/>
        </div>
        <div className='form-group mb-3'>
          <label htmlFor="instagramLink">Link to Instagram:</label>
          <input type="text" name="instagramLink" id="instagramLink" className='form-control' placeholder='instagram.com/user' onChange={handleInputChange} value={trainerData.instagramLink} disabled={action === CrudAction.View}/>
        </div>
        <div className='form-group mb-3'>
          <label htmlFor="twitterLink">Link to Twitter:</label>
          <input type="text" name="twitterLink" id="twitterLink" className='form-control' placeholder='twitter.com/user' onChange={handleInputChange} value={trainerData.twitterLink} disabled={action === CrudAction.View}/>
        </div>
        <div className="row age-row mb-3">
          <div className='form-group col'>
            <label htmlFor="age">Age:</label>
            <input type="number" name="age" id="age" className='form-control' placeholder='0' step={1} min="0" max={150} onChange={handleInputChange} value={trainerData.age} disabled={action === CrudAction.View}/>
          </div>
          <div className='form-check col pt-4'>
            <label className="form-check-label" htmlFor="active">Show on the main page</label>
            <input className="form-check-input" type="checkbox" name="active" id="active" onChange={handleInputChange} checked={trainerData.active} disabled={action === CrudAction.View}/>
          </div>
        </div>
        <div className='form-group mb-3'>
          <label htmlFor="about">About trainer:</label>
          <Editor
            readOnly={action === CrudAction.View}
            editorState={editorState}
            wrapperClassName="border rounded p-2"
            editorClassName="border rounded p-2"
            onEditorStateChange={onEditorStateChange}
          />
        </div>
        {action === CrudAction.Create ? <input type="submit" value="Create" className='btn btn-primary' /> : null}
        {action === CrudAction.Edit ? <input type="submit" value="Save" className='btn btn-primary' /> : null}
      </form>
    </div>
  )
}
