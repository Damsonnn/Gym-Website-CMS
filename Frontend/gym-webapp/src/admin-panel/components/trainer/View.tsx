﻿import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router';
import { CrudAction } from '../../../utils/CrudAction'
import { Trainer } from './List';
import { createOrEditRequest, getOneObject } from '../../../utils/ApiRequests';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'

type TrainerForm = {
  firstName: string,
  lastName: string,
  age: number,
  facebookLink?: string,
  twitterLink?: string,
  instagramLink?: string,
  active: boolean
}

export default function TrainerView(props: { action: CrudAction }) {
  const action = props.action
  const [editorState, setEditorState] = useState<EditorState>();
  const [trainerData, setTrainerData] = useState<Trainer>();

  const navigate = useNavigate();
  const { id } = useParams();

  const schema = yup.object().shape({
    firstName: yup.string().required().max(50),
    lastName: yup.string().required().max(50),
    age: yup.number().required().typeError("Must be a number").min(0),
    facebookLink: yup.string().optional().max(60),
    twitterLink: yup.string().optional().max(60),
    instagramLink: yup.string().optional().max(60),
    active: yup.boolean().required()
  })

  const { register, handleSubmit, formState: { errors }, reset } = useForm<TrainerForm>({
    resolver: yupResolver(schema),
  });

  const setDataHelper = (data: Trainer) => {
    setTrainerData(data);
    setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(data.about))));
  };

  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
  };

  const onSubmit = (data: TrainerForm) => {
    if (editorState){
      const dataToSend = {
        ...data,
        about: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      }
      createOrEditRequest(action, dataToSend, id, "trainers", navigate);
    }   
  };

  useEffect(() => {
    if (action !== CrudAction.Create) getOneObject(id, "trainers", setDataHelper);
  }, []);

  useEffect(() => {
    if (trainerData) {
      reset(trainerData)
    }
  }, [trainerData])

  return (
    <div className="container border rounded p-4 mt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="firstName">First name:</label>
            <input type="text" className={`form-control ${errors.firstName ? "input-invalid" : null}`} {...register("firstName")} placeholder='John' disabled={action === CrudAction.View} />
            <p className="text-danger">{errors.firstName?.message}</p>
          </div>
          <div className='form-group col'>
            <label htmlFor="lastName">Last name:</label>
            <input type="text" className={`form-control ${errors.lastName ? "input-invalid" : null}`} {...register("lastName")} placeholder='Smith' disabled={action === CrudAction.View} />
            <p className="text-danger">{errors.lastName?.message}</p>
          </div>
        </div>
        <div className='form-group mb-3'>
          <label htmlFor="facebookLink">Link to Facebook:</label>
          <input type="text" className={`form-control ${errors.facebookLink ? "input-invalid" : null}`} {...register("facebookLink")} placeholder='facebook.com/user' disabled={action === CrudAction.View} />
          <p className="text-danger">{errors.facebookLink?.message}</p>
        </div>
        <div className='form-group mb-3'>
          <label htmlFor="instagramLink">Link to Instagram:</label>
          <input type="text" className={`form-control ${errors.instagramLink ? "input-invalid" : null}`} {...register("instagramLink")} placeholder='instagram.com/user' disabled={action === CrudAction.View} />
          <p className="text-danger">{errors.instagramLink?.message}</p>
        </div>
        <div className='form-group mb-3'>
          <label htmlFor="twitterLink">Link to Twitter:</label>
          <input type="text" className={`form-control ${errors.twitterLink ? "input-invalid" : null}`} {...register("twitterLink")} placeholder='twitter.com/user' disabled={action === CrudAction.View} />
          <p className="text-danger">{errors.twitterLink?.message}</p>
        </div>
        <div className="row age-row mb-3">
          <div className='form-group col'>
            <label htmlFor="age">Age:</label>
            <input type="number" className={`form-control ${errors.age ? "input-invalid" : null}`} {...register("age")} placeholder='0' step={1} disabled={action === CrudAction.View} />
            <p className="text-danger">{errors.age?.message}</p>
          </div>
          <div className='form-check col pt-4'>
            <label className="form-check-label" htmlFor="active">Show on the main page</label>
            <input className="form-check-input" type="checkbox" {...register("active")} disabled={action === CrudAction.View} />
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
