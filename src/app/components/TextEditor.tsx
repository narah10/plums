import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TextEditorProps {
  handleEditorChange: (content: string) => void;
  content: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ handleEditorChange, content }) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    // Set the initial value from the content prop if it exists
    if (content) {
      console.log(content)
      setValue(content);
    }
  }, [content]);

  const handleChange = (content: string) => {
    setValue(content);
    handleEditorChange(content);
  };

  return (
    <div className='bg-white' style={{ width: 1000, height: 100 }}>
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
  );
};

export default TextEditor;
