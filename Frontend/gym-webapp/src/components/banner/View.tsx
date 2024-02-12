import { FormEvent, useState, ChangeEvent, useEffect } from 'react'
import { CrudAction } from "../../utils/CrudAction";
import { Banner } from './List'
import { useNavigate, useParams } from "react-router";
import { createOrEditRequest, getOneObject } from "../../utils/ApiRequests";
import { refreshInput } from '../../utils/Handlers';

export default function BannerView(props: {action: CrudAction}) {
  const [action, setAction] = useState<CrudAction>(props.action);
  const [bannerData, setBannerData] = useState<Banner>({
    id:0,
    title:"",
    body:"",
    active: false
  })
  
  const navigate = useNavigate();
  const { id } = useParams();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    refreshInput(event, bannerData, setBannerData);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createOrEditRequest(action, bannerData, id, "banners", navigate);
  };

  useEffect(() => {
    if (action != CrudAction.Create) {
      getOneObject(id, "banners", setBannerData);
    }
  }, []);

  return (
    <div className="container border rounded p-4 mt-4">
        <form onSubmit={handleSubmit}>
          <div className='row mb-3'>
            <div className='form-group col'>
              <label htmlFor="title">Tytuł:</label>
              <input type="text" name='title' id="name" className='form-control' placeholder='Kategoria' onChange={handleInputChange} value={bannerData.title} disabled={action === CrudAction.View}/>
            </div>
          </div>
          <div className='row mb-3'>
            <div className='form-group col'>
              <label htmlFor="body">Tekst pod tytułem:</label>
              <input type="text" name="body" id="body" className='form-control' placeholder='Kategoria' onChange={handleInputChange} value={bannerData.body} disabled={action === CrudAction.View}/>
            </div>
          </div>
          <div className='form-check mb-3'>
            <label className="form-check-label" htmlFor="active">Wyświetlaj na stronie głównej</label>
            <input className="form-check-input" type="checkbox" name="active" id="active" onChange={handleInputChange} checked={bannerData.active} disabled={action === CrudAction.View}/>
          </div>
          {action === CrudAction.Create ? <input type="submit" value="Utwórz" className='btn btn-primary' /> : null}
          {action === CrudAction.Edit ? <input type="submit" value="Zapisz" className='btn btn-primary' /> : null}
        </form>
    </div>
  )
}
