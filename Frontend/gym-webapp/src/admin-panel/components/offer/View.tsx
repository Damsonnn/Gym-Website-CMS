import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState, convertToRaw } from "draft-js";
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router';
import { CrudAction } from '../../../utils/CrudAction'
import { Offer } from './List';
import { createObject, editObject, getOneObject } from '../../../utils/ApiRequests';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'
import { showAlert, AlertType } from '../../../utils/Alerts'; 

type OfferForm = {
  name: string
  price: number
  discount: number
  active: boolean
}

const ENDPOINT = "offers"

export default function OfferView(props: { action: CrudAction }) {
  const [alert, setAlert] = useState<AlertType>(AlertType.None)
  const action = props.action
  const [editorState, setEditorState] = useState<EditorState>();
  const [offerData, setOfferData] = useState<Offer>();

  const navigate = useNavigate();
  const { id } = useParams();

  const schema = yup.object().shape({
    name: yup.string().required().min(3).max(50),
    price: yup.number().required().typeError("Must be a number").min(0),
    discount: yup.number().typeError("Must be a number").required().min(0).max(100),
    active: yup.boolean().required()
  })

  const { register, handleSubmit, formState: { errors, submitCount, isValid }, reset } = useForm<OfferForm>({
    resolver: yupResolver(schema),
  });

  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
  };

  const setDataHelper = (data: Offer) => {
    setOfferData(data)
    setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(data.body))))
  };

  const onSubmit = (data: OfferForm) => {
    if (editorState) {
      const dataToSend = {
        ...data,
        body: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      }
      if (action === CrudAction.Create) createObject(dataToSend, ENDPOINT, navigate, setAlert);
      else if (id) editObject(dataToSend, id, ENDPOINT, setAlert)
    }
  };

  useEffect(() => {
    if (action !== CrudAction.Create) getOneObject(id, ENDPOINT, setDataHelper);
  }, []);

  useEffect(() => {
    if (offerData) reset(offerData)
  }, [offerData])

  useEffect(() => {
    if (submitCount > 0 && !isValid) setAlert(AlertType.Incomplete);
  }, [submitCount]);

  return (
    <div className="container border rounded p-4 mt-4">
      {showAlert(alert, setAlert)}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="name">Offer name:</label>
            <input type="text" className={`form-control ${errors.name ? "input-invalid" : null}`} {...register("name")} placeholder='Offer' disabled={action === CrudAction.View} />
            <p className="text-danger">{errors.name?.message}</p>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="body">Offer content:</label>
            <Editor
              readOnly={action === CrudAction.View}
              editorState={editorState}
              wrapperClassName="border rounded p-2"
              editorClassName="border rounded p-2"
              onEditorStateChange={onEditorStateChange}
            />
          </div>
        </div>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="price">Price:</label>
            <input type="number" className={`form-control ${errors.price ? "input-invalid" : null}`} {...register("price")} placeholder='99.99' step={0.01} min="0" disabled={action === CrudAction.View} />
            <p className="text-danger">{errors.price?.message}</p>
          </div>
          <div className='form-group col'>
            <label htmlFor="discount">Discount [%]:</label>
            <input type="number" className={`form-control ${errors.discount ? "input-invalid" : null}`} {...register("discount")} placeholder='0' disabled={action === CrudAction.View} />
            <p className="text-danger">{errors.discount?.message}</p>
          </div>
        </div>
        <div className='form-check m-3'>
          <label className="form-check-label" htmlFor="active">Show under 'offers' tab</label>
          <input className="form-check-input" type="checkbox" {...register("active")} disabled={action === CrudAction.View} />
          <p className="text-danger">{errors.active?.message}</p>
        </div>
        {action === CrudAction.Create ? <input type="submit" value="Create" className='btn btn-primary' /> : null}
        {action === CrudAction.Edit ? <input type="submit" value="Save" className='btn btn-primary' /> : null}
      </form>
    </div>
  )
}
