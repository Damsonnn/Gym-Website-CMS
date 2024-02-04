import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import { FormEvent, useState, ChangeEvent, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router';
import { CrudAction } from '../../utils/CrudAction'
import { Offer } from './List';
import { createOrEditRequest, getOneObject } from '../../utils/ApiRequests';
import { refreshInput } from '../../utils/Handlers';
import axios from "axios";
import { config } from "../../utils/JWTConfig";

export default function OfferView(props: {action: CrudAction}) {
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

  const getOffer = async () => {
    if (action != CrudAction.Create) {
      try {
        await axios.get(`http://localhost:8080/api/offers/${id}`, config).then(response => {
            console.log(response)
            if (response.status === 200) {
                setOfferData(response.data)
                setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(response.data["body"]))))
            }
            else {
                console.log("Could not get data");
            }
          })
    } catch (error) {
        console.error('Error during fetching:', error);
    }
      // getOneObject(id, "offers", setOfferData);
    }
  }

  const onEditorStateChange = (newState: EditorState) => {
    console.log(newState)
    setEditorState(newState);
    // console.log(newState.getCurrentContent().toString());
    setOfferData({...offerData, ["body"]: JSON.stringify(convertToRaw(newState.getCurrentContent()))});
    console.log(offerData)
  };

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
