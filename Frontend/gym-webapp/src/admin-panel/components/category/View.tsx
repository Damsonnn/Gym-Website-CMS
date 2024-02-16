import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router';
import { CrudAction } from '../../../utils/CrudAction'
import { createOrEditRequest, getOneObject } from '../../../utils/ApiRequests';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';


type CategoryDto = {
  name: string
  active: boolean
}

export default function CategoryView(props: { action: CrudAction }) {
  const action = props.action
  const schema = yup.object().shape({
    name: yup.string().required().min(3).max(50),
    active: yup.boolean().required()
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const {register, handleSubmit, formState: { errors }, reset} = useForm<CategoryDto>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: CategoryDto) => {
    createOrEditRequest(action, data, id, "categories", navigate);
  };

  useEffect(() => {
    if (action !== CrudAction.Create) getOneObject(id, "categories", reset);
  }, []);

  return (
    <div className="container border rounded p-4 mt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row'>
          <div className='form-group col'>
            <label htmlFor="name">Category name:</label>
            <input type="text" className={`form-control ${errors.name ? "input-invalid" : null}`} placeholder='name' {...register("name")} disabled={action === CrudAction.View}/>
            <p className="text-danger">{errors.name?.message}</p>
          </div>
        </div>
        <div className='form-check mb-3'>
          <label className="form-check-label" htmlFor="active">Show on main page</label>
          <input className="form-check-input" type="checkbox" {...register("active")} disabled={action === CrudAction.View}/>
        </div>
        {action === CrudAction.Create ? <input type="submit" value="Create" className='btn btn-primary' /> : null}
        {action === CrudAction.Edit ? <input type="submit" value="Save" className='btn btn-primary' /> : null}
      </form>
    </div>
  )
}
