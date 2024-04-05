import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TextEditorProps {
  handleEditorChange: (content: string, images: string[]) => void; // Update handleEditorChange signature
  content: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ handleEditorChange, content }) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (content) {
      setValue(content);
    }
  }, [content]);

  const handleChange = (content: string) => {
    setValue(content);
    // Extract image URLs from the content
    const imageUrls = extractImageUrls(content);
    handleEditorChange(content, imageUrls);
  };

  const extractImageUrls = (content: string): string[] => {
    const regex = /<img src="(.*?)"/g;
    const urls: string[] = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      urls.push(match[1]);
    }
    return urls;
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
        className='text-slate-600 min-h-[200px] rounded-lg p-1 bg-white'
      />
    </div>
  );
};

export default TextEditor;
