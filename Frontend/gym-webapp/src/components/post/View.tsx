import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor, EditorState } from "react-draft-wysiwyg";
import { FormEvent, useState, ChangeEvent, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router';
import { CrudAction } from '../../utils/CrudAction'
import { Post } from './List';
import { Category } from "../category/List";
import { createOrEditRequest, getOneObject, getAllObjects } from '../../utils/ApiRequests';
import { refreshInput } from '../../utils/Handlers';

export default function PostView(props: { action: CrudAction }) {
  const [editorState, setEditorState] = useState<EditorState>();
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [action, setAction] = useState<CrudAction>(props.action);
  const [postData, setPostData] = useState<Post>({
    id: 0,
    title: "",
    body: "",
    category: {
      id: 1,
      name: "",
      active: false
    },
    author: "",
    active: false
  });

const navigate = useNavigate();
const { id } = useParams();

const getPost = () => {
  if (action != CrudAction.Create) {
    getOneObject(id, "posts", setPostData);
  }
}

const getOptions = () => {
  getAllObjects("categories", setCategories);
}

const onEditorStateChange = (newState: EditorState) => {
  newState.
  setEditorState(newState);
};

const mapCategories = (categories: Array<Category>) => {
  if (categories.length === 0) {
      return  <option value="0">Brak kategorii do wyboru</option>;
  }
  return categories.map(category => {
      return <option value={category.id}>{category.name}</option>
  })
}

const handleInputChange = (event: ChangeEvent<any>) => {
  refreshInput(event, postData, setPostData);
  console.log(postData);
};

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  createOrEditRequest(action, postData, id, "posts", navigate);
};

useEffect(() => {
  getPost();
  getOptions();
}, []);

  return (
    <div className="container border rounded p-4 mt-4">
      <form onSubmit={handleSubmit}>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="title">Tytuł:</label>
            <input type="text" name="title" id="title" className='form-control' placeholder='Tytuł' onChange={handleInputChange} value={postData.title} disabled={action === CrudAction.View}/>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="author">Autor:</label>
            <input type="text" name="author" id="author" className='form-control' placeholder='Autor' onChange={handleInputChange} value={postData.author} disabled={action === CrudAction.View}/>
          </div>
          <div className='form-group col'>
            <label htmlFor="category">Kategoria:</label>
            <select className="form-select" name="category" id="category" onChange={handleInputChange} value={postData.category.id} disabled={action === CrudAction.View}>
              {mapCategories(categories)}
            </select>
          </div>
        </div>
        <div className='mb-3'>
          <div className='form-check'>
            <label className="form-check-label" htmlFor="active">Wyświetlaj na stronie głównej</label>
            <input className="form-check-input" type="checkbox" name="active" id="active" onChange={handleInputChange} checked={postData.active} disabled={action === CrudAction.View}/>
          </div>
        </div>
          <Editor
            editorState={editorState}
            wrapperClassName="border rounded p-2"
            editorClassName="border rounded p-2"
            onEditorStateChange={onEditorStateChange}
          />
        {action === CrudAction.Create ? <input type="submit" value="Utwórz" className='btn btn-primary' /> : null}
        {action === CrudAction.Edit ? <input type="submit" value="Zapisz" className='btn btn-primary' /> : null}
      </form>
    </div>
  )
}
