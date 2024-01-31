import { FormEvent, useState, ChangeEvent, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router';
import { CrudAction } from '../../utils/CrudAction'
import { Category } from './List';
import { createEditRequest, getOneObject } from '../../utils/ApiRequests';

export default function CategoryView(props: { action: CrudAction }) {
  const [action, setAction] = useState<CrudAction>(props.action)
  const [categoryData, setCategoryData] = useState<Category>({
    id: 0,
    name: "",
    active: false
  } as Category);

  const navigate = useNavigate();
  const { id } = useParams();

  const getCategory = async () => {
    if (action != CrudAction.Create) {
      getOneObject(id, "categories", setCategoryData);
    }
  }
  useEffect(() => {
    getCategory()
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (event.target.type === "checkbox") {
      setCategoryData({ ...categoryData, [name]: event.target.checked });
    } else {
      setCategoryData({ ...categoryData, [name]: value });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createEditRequest(action, categoryData, id, "categories", navigate);
  };


  return (
    <div className="container border rounded p-4 mt-4">
      <form onSubmit={handleSubmit}>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="name">Nazwa kategorii:</label>
            <input type="text" name="name" id="name" className='form-control' placeholder='Kategoria' onChange={handleInputChange} value={categoryData.name} readOnly={action === CrudAction.View}/>
          </div>
        </div>
        <div className='form-check mb-3'>
          <label className="form-check-label" htmlFor="active">Wyświetlaj na stronie głównej</label>
          <input className="form-check-input" type="checkbox" name="active" id="active" onChange={handleInputChange} checked={categoryData.active} disabled={action === CrudAction.View}/>
        </div>
        {action === CrudAction.Create ? <input type="submit" value="Utwórz" className='btn btn-primary' /> : null}
        {action === CrudAction.Edit ? <input type="submit" value="Zapisz" className='btn btn-primary' /> : null}
      </form>
    </div>
  )
}
