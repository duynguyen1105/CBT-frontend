import {Box, Grid, createStyles} from '@mantine/core';
import DOMPurify from 'dompurify';
import {LayoutComponent} from 'types/layout';
import {IQuestion} from 'types/question';
import Text from '../base/Text';

const useStyle = createStyles<string, {}>((theme) => ({
  question: {
    '& .answer-drop': {
      float: 'left',
      width: '100px',
      height: ' 35px',
      margin: '10px',
      padding: '10px',
      border: '1px solid black',
    },
    '& .item': {
      display: 'inline-block',
    },
  },
}));
interface MatchingProps {
  questionNo?: number;
  content?: IQuestion;
}
const Matching: LayoutComponent = (props: MatchingProps) => {
  const {questionNo, content} = props;
  const {classes, cx} = useStyle({}, {name: 'Matching'});

  function allowDrop(ev: any) {
    ev.preventDefault();
  }

  function drag(ev: any) {
    ev.dataTransfer.setData('text', ev.target.id);
  }

  function drop(ev: any) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData('text');
    ev.target.appendChild(document.getElementById(data));
  }

  const data = `<div class="answer-drop" id="div1" ondrop="drop(event)" ondragover="allowDrop(event)">
  <img src="img_w3slogo.gif" draggable="true" ondragstart="drag(event)" id="drag1" width="88" height="31">
</div>

<div id="div2" class="answer-drop" ondrop="drop(event)" ondragover="allowDrop(event)"></div>`;
  const sanitizedData = () => ({__html: DOMPurify.sanitize(data)});
  return (
    <Box className={classes.question}>
      {questionNo && <Text size={'md'}>{`Question ${questionNo}`}</Text>}

      {/* <Grid>
        <Grid.Col span={9}> */}
      <div dangerouslySetInnerHTML={sanitizedData()} />
      {/* </Grid.Col>
        <Grid.Col span={3}> */}
      {/* <div id="item-container">
        <div id="answer-1" onDragStart={drag} className="item" draggable="true">
          Item 1
        </div>
        <div id="answer-1" onDragStart={drag} className="item" draggable="true">
          Item 2
        </div>
      </div> */}
      {/* </Grid.Col>
      </Grid> */}
    </Box>
  );
};

export default Matching;
