import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { Accordion, ActionIcon, Box, Flex, createStyles, rem } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { IconGripVertical, IconX } from '@tabler/icons-react';
import {
  QuestionType,
  QUESTION_TYPE,
  fakeDropdownSelect,
  fakeFillInGap,
  fakeSelectMany,
  fakeSelectOne,
} from 'types/question';
import { IDescription, ISection } from 'types/test';
import DropdownSelect from 'views/components/questions/DropdownSelect';
import FillInGap from 'views/components/questions/FillInGap';
import SelectMany from 'views/components/questions/SelectMany';
import SelectOne from 'views/components/questions/SelectOne';
import Description from 'views/components/test/Description';
import ModalAddTestContent from '../ModalAddTestContent';

const useStyles = createStyles((theme) => ({
  item: {
    display: 'grid',
    gridTemplateColumns: '60px 1fr',
    borderRadius: theme.radius.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    // padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    paddingLeft: `calc(${theme.spacing.xl} - ${theme.spacing.md})`, // to offset drag handle
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: rem(30),
    fontWeight: 700,
    width: rem(60),
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // height: '100%',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    paddingTop: theme.spacing.md,
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs,
  },
}));
enum ContentType {
  DescriptionType = 'Description',
  QuestionType = 'Question',
  SectionType = 'Section',
}
interface DndListHandleProps {
  data?: Content[];
}
interface Content {
  id: string;
  type: ContentType;
  content: IDescription | QuestionType | ISection;
}

let fakedata = [
  {
    id: '1',
    type: ContentType.DescriptionType,
    content: { description: '123' },
  },
  {
    id: '2',
    type: ContentType.QuestionType,
    content: fakeDropdownSelect,
  },
  {
    id: '3',
    type: ContentType.QuestionType,
    content: fakeFillInGap,
  },
  {
    id: '4',
    type: ContentType.QuestionType,
    content: fakeSelectMany,
  },
  {
    id: '5',
    type: ContentType.QuestionType,
    content: fakeSelectOne,
  },
];

export default function FormAddContentTestPage({ data = fakedata }: DndListHandleProps) {
  const { classes, cx } = useStyles();
  const [state, handlers] = useListState(data);

  const getComponent = (item: Content) => {
    switch (item.type) {
      case ContentType.DescriptionType:
        return <Description />;

      case ContentType.QuestionType:
        switch ((item.content as QuestionType).type) {
          case QUESTION_TYPE.DropdownSelect:
            return <DropdownSelect question={item.content as QuestionType} />;
          case QUESTION_TYPE.FillInGap:
            return <FillInGap question={item.content as QuestionType} />;
          case QUESTION_TYPE.SelectMany:
            return <SelectMany question={item.content as QuestionType} />;
          case QUESTION_TYPE.SelectOne:
            return <SelectOne question={item.content as QuestionType} />;
          default:
            break;
        }
        break;

      default:
        break;
    }
  };

  const items = state.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.id}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <Flex justify="center" align="flex-start" direction="row" wrap="nowrap">
            <ActionIcon radius="xl" mt="sm">
              <IconX size="0.875rem" color="red" />
            </ActionIcon>
            <div {...provided.dragHandleProps} className={classes.dragHandle}>
              <IconGripVertical size="1.05rem" stroke={1.5} />
            </div>
          </Flex>
          <div>
            {getComponent(item)}
            {/* <Accordion defaultValue="customization" miw={'100%'} variant="filled">
              <Accordion.Item value="customization">
                <Accordion.Control>{item.type}</Accordion.Control>
                <Accordion.Panel>
                  <Textarea placeholder="Your description" />
                  <SelectOne />
                  <SelectMany />
                  <Matching />
                  <DropdownSelect />
                  <FillInGap />
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion> */}
          </div>
        </div>
      )}
    </Draggable>
  ));

  return (
    <Box>
      <Accordion miw={'100%'} variant="filled">
        <DragDropContext
          onDragEnd={({ destination, source }) =>
            handlers.reorder({ from: source.index, to: destination?.index || 0 })
          }
        >
          <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {items}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Flex justify="flex-end">
          <ModalAddTestContent />
        </Flex>
      </Accordion>
    </Box>
  );
}

// câu hỏi ở database
// {
//   question: {
//     content: 'What does the man @dropdown:1 when he says "Have @dropdown:2 seen the interview questions we use?';
//     answer: [
//       {
//         id: 1,
//         content: 'apple',
//       },
//       {
//         id: 2,
//         content: 'banana',
//       },
//     ];
//   }
// }

// học sinh trả lời
// {
//   answer: [
//     {
//       id: 1,
//       content: 'apple',
//     }
//     {
//       id: 2,
//       content: 'apple',
//     },
//   ];
// }
