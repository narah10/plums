import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from 'quill';

interface TextEditorProps {
  handleEditorChange: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ handleEditorChange }) => {
  const [value, setValue] = useState<string>('');
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    setValue('');
    setRefresh(false);
  }, [refresh]);

  const handleChange = (content: string) => {
    setValue(content);
    handleEditorChange(content);
  };

  // console.log(value)
  // const quill = new Quill('#editor', {
  //   modules: {
  //     toolbar: [
  //       [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //       [{ font : [] }],
  //       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  //       [{ list: 'ordered' }, { list: 'bullet' }],
  //       ['image', 'code-block', 'attachments', 'link', 'video'],
  //     ],
  //   },
  //   placeholder: 'Write a note...',
  //   theme: 'snow', // or 'bubble'
  // });
  return (
    <div className='bg-white'>
    <ReactQuill
      theme='snow'
      value={value}
      onChange={handleChange}
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['image', 'code-block', 'link', 'video'],
        ],
      }}
      placeholder='Write a note...'
      className='text-slate-600 min-h-[200px] rounded-lg p-1'
    />
  </div>
  )
}

export default TextEditor;