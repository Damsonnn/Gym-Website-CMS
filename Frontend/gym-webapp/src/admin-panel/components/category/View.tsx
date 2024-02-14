import { FormEvent, useState, ChangeEvent, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router';
import { CrudAction } from '../../../utils/CrudAction'
import { Category } from './List';
import { createOrEditRequest, getOneObject } from '../../../utils/ApiRequests';
import { refreshInput } from '../../../utils/Handlers';

export default function CategoryView(props: { action: CrudAction }) {
  const [action, setAction] = useState<CrudAction>(props.action);
  const [categoryData, setCategoryData] = useState<Category>({
    id: 0,
    name: "",
    active: false
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    refreshInput(event, categoryData, setCategoryData);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createOrEditRequest(action, categoryData, id, "categories", navigate);
  };

  useEffect(() => {
    if (action != CrudAction.Create) {
      getOneObject(id, "categories", setCategoryData);
    }
  }, []);

  return (
    <div className="container border rounded p-4 mt-4">
      <form onSubmit={handleSubmit}>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="name">Category name:</label>
            <input type="text" name="name" id="name" className='form-control' placeholder='name' onChange={handleInputChange} value={categoryData.name} disabled={action === CrudAction.View}/>
          </div>
        </div>
        {/* <div className='form-check mb-3'>
          <label className="form-check-label" htmlFor="active">Wyświetlaj na stronie głównej</label>
          <input className="form-check-input" type="checkbox" name="active" id="active" onChange={handleInputChange} checked={categoryData.active} disabled={action === CrudAction.View}/>
        </div> */}
        {action === CrudAction.Create ? <input type="submit" value="Create" className='btn btn-primary' /> : null}
        {action === CrudAction.Edit ? <input type="submit" value="Save" className='btn btn-primary' /> : null}
      </form>
    </div>
  )
}
