import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from 'quill';

export default function TextEditor() {
  const [value, setValue] = useState('');
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
      onChange={setValue}
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
      className='text-slate-600 border border-white rounded-lg p-1'
    />
  </div>
  )
}