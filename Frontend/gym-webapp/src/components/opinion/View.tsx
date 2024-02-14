import { FormEvent, useState, ChangeEvent, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router';
import { CrudAction } from '../../utils/CrudAction'
import { Opinion } from './List';
import { createOrEditRequest, getOneObject } from '../../utils/ApiRequests';
import { refreshInput } from '../../utils/Handlers';

export default function OpinionView(props: {action: CrudAction}) {
  const [action, setAction] = useState<CrudAction>(props.action)
  const [opinionData, setOpinionData] = useState<Opinion>({
    id: 0,
    author: "",
    body: "",
    active: false
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    refreshInput(event, opinionData, setOpinionData);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createOrEditRequest(action, opinionData, id, "opinions", navigate);
  };

  useEffect(() => {
    if (action != CrudAction.Create) {
      getOneObject(id, "opinions", setOpinionData);
    }
  }, []);

  return (
    <div className="container border rounded p-4 mt-4">
      <form onSubmit={handleSubmit}>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="author">Author:</label>
            <input type="text" name="author" id="author" className='form-control' placeholder={`Opinion's author`}  onChange={handleInputChange} value={opinionData.author} disabled={action === CrudAction.View}/>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="body">Opinion:</label>
            <input type='text' name="body" id="body" className='form-control' placeholder='Opinion here...'  onChange={handleInputChange} value={opinionData.body} disabled={action === CrudAction.View}/>
          </div>
        </div>
        <div className='form-check mb-3'>
          <label className="form-check-label" htmlFor="active">Show on main page</label>
          <input className="form-check-input" type="checkbox" name="active" id="active" onChange={handleInputChange} checked={opinionData.active} disabled={action === CrudAction.View}/>
        </div>
        {action === CrudAction.Create ? <input type="submit" value="Create" className='btn btn-primary' /> : null}
        {action === CrudAction.Edit ? <input type="submit" value="Save" className='btn btn-primary' /> : null}
      </form>
    </div>
  )
}
