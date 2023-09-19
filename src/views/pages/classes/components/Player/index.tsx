import {FC} from 'react';
import useStyle from './styles';
import ReactAudioPlayer from 'react-audio-player';

const PlayerBar: FC = () => {
  const {classes} = useStyle({}, {name: 'AudioComponent'});
  return (
    <ReactAudioPlayer
      className={classes.root}
      src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      controls
    />
  );
};

export default PlayerBar;
