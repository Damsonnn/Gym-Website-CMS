import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import { FormEvent, useState, ChangeEvent, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router';
import { CrudAction } from '../../../utils/CrudAction'
import { Offer } from './List';
import { createOrEditRequest, getOneObject } from '../../../utils/ApiRequests';
import { refreshInput } from '../../../utils/Handlers';

export default function OfferView(props: { action: CrudAction }) {
  const [editorState, setEditorState] = useState<EditorState>();
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

  const setDataHelper = (data: Offer) => {
    setOfferData(data)
    setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(data.body))))
  };

  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
    setOfferData({ ...offerData, ["body"]: JSON.stringify(convertToRaw(newState.getCurrentContent())) });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    refreshInput(event, offerData, setOfferData);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createOrEditRequest(action, offerData, id, "offers", navigate);
  };

  useEffect(() => {
    getOneObject(id, "offers", setDataHelper);
  }, []);

  return (
    <div className="container border rounded p-4 mt-4">
      <form onSubmit={handleSubmit}>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="name">Offer name:</label>
            <input type="text" name="name" id="name" className='form-control' placeholder='Offer' onChange={handleInputChange} value={offerData.name} disabled={action === CrudAction.View} />
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
            <input type="number" name="price" id="price" className='form-control' placeholder='99.99' step={0.01} min="0" onChange={handleInputChange} value={offerData.price} disabled={action === CrudAction.View} />
          </div>
          <div className='form-group col'>
            <label htmlFor="discount">Discount [%]:</label>
            <input type="number" name="discount" id="discount" className='form-control' placeholder='0' max="100" min="0" onChange={handleInputChange} value={offerData.discount} disabled={action === CrudAction.View} />
          </div>
        </div>
        <div className='form-check m-3'>
          <label className="form-check-label" htmlFor="active">Show under 'offers' tab</label>
          <input className="form-check-input" type="checkbox" name="active" id="active" onChange={handleInputChange} checked={offerData.active} disabled={action === CrudAction.View} />
        </div>
        {action === CrudAction.Create ? <input type="submit" value="Create" className='btn btn-primary' /> : null}
        {action === CrudAction.Edit ? <input type="submit" value="Save" className='btn btn-primary' /> : null}
      </form>
    </div>
  )
}
