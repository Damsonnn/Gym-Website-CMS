import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router';
import { CrudAction } from '../../../utils/CrudAction'
import { createOrEditRequest, getOneObject } from '../../../utils/ApiRequests';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'

type OpinionDto = {
  author: string
  body:string
  active: boolean
}

export default function OpinionView(props: {action: CrudAction}) {
  const [action, setAction] = useState<CrudAction>(props.action)
  const navigate = useNavigate();
  const { id } = useParams();

  const schema = yup.object().shape({
    author: yup.string().required().min(3).max(40),
    body: yup.string().required().min(5).max(400),
    active: yup.boolean().required()
  });

  const onSubmit = (data: OpinionDto) => {
    createOrEditRequest(action, data, id, "opinions", navigate);
  };

  const {register, handleSubmit, formState: { errors }, reset} = useForm<OpinionDto>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (action != CrudAction.Create) {
      getOneObject(id, "opinions", reset);
    }
  }, []);

  return (
    <div className="container border rounded p-4 mt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row'>
          <div className='form-group col'>
            <label htmlFor="author">Author:</label>
            <input type="text" className={`form-control ${errors.author ? "input-invalid" : null}`} {...register("author")} placeholder={`Opinion's author`}  disabled={action === CrudAction.View}/>
            <p className="text-danger">{errors.author?.message}</p>
          </div>
        </div>
        <div className='row'>
          <div className='form-group col'>
            <label htmlFor="body">Opinion:</label>
            <input type='text' className={`form-control ${errors.body ? "input-invalid" : null}`} {...register("body")} placeholder='Opinion here...'  disabled={action === CrudAction.View}/>
            <p className="text-danger">{errors.body?.message}</p>
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
