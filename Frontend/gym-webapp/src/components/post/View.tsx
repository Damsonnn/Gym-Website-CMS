import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { CrudAction } from '../../utils/CrudAction'
import { Editor, EditorState } from "react-draft-wysiwyg";
import { useState } from "react";

export default function PostView(props: { action: CrudAction }) {
  const [editorState, setEditorState] = useState<EditorState>();

  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
  };

  return (
    <div className="container border rounded p-4 mt-4">
      <form>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="title">Tytuł:</label>
            <input type="text" name="title" id="title" className='form-control' placeholder='Tytuł' />
          </div>
        </div>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="author">Autor:</label>
            <input type="text" name="author" id="author" className='form-control' placeholder='Autor' />
          </div>
          <div className='form-group col'>
            <label htmlFor="category">Kategoria:</label>
            <input type="text" name="category" id="category" className='form-control' placeholder='Kategoria' />
          </div>
        </div>
        <div className='mb-3'>
          <div className='form-check'>
            <label className="form-check-label" htmlFor="active">Wyświetlaj na stronie głównej</label>
            <input className="form-check-input" type="checkbox" name="active" id="active" />
          </div>
        </div>
          <Editor
            editorState={editorState}
            wrapperClassName="border rounded p-2"
            editorClassName="border rounded p-2"
            onEditorStateChange={onEditorStateChange}
          />
        {/* <input type="submit" value="Zaloguj" className='btn btn-primary'/> */}
      </form>
    </div>
  )
}
