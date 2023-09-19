import {Text} from '@mantine/core';
import Editor from './Editor';
import useStyle from './styles';
interface InputsRichtextProps {
  title?: string;
  placeholder?: string;
  name: string;
  onChange: any;
  value: any;
  className: string;
}

const InputsRichtext = (props: InputsRichtextProps) => {
  const {classes} = useStyle({}, {name: 'InputRichText'});
  const {title, value, onChange, placeholder, className} = props;

  return (
    <div className={classes.container}>
      <Text className={classes.textTitle}>{title}</Text>
      <Editor
        value={value}
        onChange={onChange}
        placeholder={placeholder || ''}
        className={className}
      />
    </div>
  );
};

export default InputsRichtext;
