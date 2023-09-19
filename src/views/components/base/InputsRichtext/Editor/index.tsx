import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, {formats, redoChange, undoChange} from './EditorToolbar';
import './styles.css';

interface EditorProps {
  placeholder?: string;
  onChange: any;
  value: any;
  className: string;
}

export const Editor = (props: EditorProps) => {
  const {onChange, value, placeholder, className} = props;

  const handleChange = (value: any) => {
    onChange(value);
  };
  const modules = {
    toolbar: {
      container: `.${className}`,
      handlers: {
        undo: undoChange,
        redo: redoChange,
      },
    },
  };
  return (
    <div className="text-editor">
      <EditorToolbar className={className} />
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
