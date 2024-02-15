import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import { FormEvent, useState, ChangeEvent, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router';
import { CrudAction } from '../../../utils/CrudAction'
import { Post } from './List';
import { Category } from "../category/List";
import { createOrEditRequest, getOneObject, getAllObjects } from '../../../utils/ApiRequests';
import { refreshInput } from '../../../utils/Handlers';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'

type PostForm = {
  title: string
  categoryId: number
  author: string
  active: boolean
}

export default function PostView(props: { action: CrudAction }) {
  const [editorState, setEditorState] = useState<EditorState>();
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [action, setAction] = useState<CrudAction>(props.action);
  const [postData, setPostData] = useState<Post>();

const navigate = useNavigate();
const { id } = useParams();

const schema = yup.object().shape({
  title: yup.string().required().min(3).max(150),
  categoryId: yup.number().required(),
  author: yup.string().required().min(3).max(40),
  active: yup.boolean().required()
})

const {register, handleSubmit, formState: { errors }, reset} = useForm<PostForm>({
  resolver: yupResolver(schema),
});

const setDataHelper = (data: Post) => {
  setPostData(data)
  setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(data.body))))
};

const onEditorStateChange = (newState: EditorState) => {
  setEditorState(newState);
  // setPostData({...postData, ["body"]: JSON.stringify(convertToRaw(newState.getCurrentContent()))});
};

const mapCategories = (categories: Array<Category>) => {
  if (categories.length === 0) {
      return  <option value="0">No categories to choose from</option>;
  }
  return categories.map(category => {
      return <option value={category.id}>{category.name}</option>
  })
}

const onSubmit = (data: PostForm) => {
  if (postData && editorState){
    setPostData({
      ...postData,
      title: data.title,
      author: data.author,
      category: {
        id: data.categoryId,
        name: "",
        active: true
      },
      active: data.active,
      body: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    })
    createOrEditRequest(action, postData, id, "posts", navigate);
  }
};

useEffect(() => {
  getOneObject(id, "posts", setDataHelper);
  getAllObjects("categories", setCategories);
}, []);

useEffect(() => {
  if (postData){
    reset({
      title: postData.title,
      author: postData.author,
      categoryId: postData.category.id,
      active: postData.active,
    })
  }
}, [postData])


  return (
    <div className="container border rounded p-4 mt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="title">Title:</label>
            <input type="text" className={`form-control ${errors.title ? "input-invalid" : null}`} {...register("title")} placeholder='Title' disabled={action === CrudAction.View}/>
            <p className="text-danger">{errors.title?.message}</p>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="author">Author:</label>
            <input type="text" className={`form-control ${errors.author ? "input-invalid" : null}`} {...register("author")} placeholder='Author' disabled={action === CrudAction.View}/>
            <p className="text-danger">{errors.author?.message}</p>
          </div>
          <div className='form-group col'>
            <label htmlFor="category">Category:</label>
            <select className="form-select" {...register("categoryId")} disabled={action === CrudAction.View}>
            <option value="" disabled selected>Select category</option>
              {mapCategories(categories)}
            </select>
          </div>
        </div>
        <div className='mb-3'>
          <div className='form-check'>
            <label className="form-check-label" htmlFor="active">Show on main page</label>
            <input className="form-check-input" type="checkbox" {...register("active")} disabled={action === CrudAction.View}/>
          </div>
        </div>
        <Editor
          readOnly={action === CrudAction.View}
          editorState={editorState}
          wrapperClassName="border rounded p-2"
          editorClassName="border rounded p-2"
          onEditorStateChange={onEditorStateChange}
        />
        {action === CrudAction.Create ? <input type="submit" value="Create" className='btn btn-primary m-3' /> : null}
        {action === CrudAction.Edit ? <input type="submit" value="Save" className='btn btn-primary m-3' /> : null}
      </form>
    </div>
  )
}
