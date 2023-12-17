import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { Accordion, ActionIcon, Box, Flex, createStyles, rem } from '@mantine/core';
import { UseListStateHandlers } from '@mantine/hooks';
import { IconGripVertical, IconX } from '@tabler/icons-react';
import { QUESTION_TYPE, QuestionType } from 'types/question';
import DropdownSelect from 'views/components/questions/DropdownSelect';
import FillInGap from 'views/components/questions/FillInGap';
import SelectMany from 'views/components/questions/SelectMany';
import SelectOne from 'views/components/questions/SelectOne';
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

interface DndListHandleProps {
  questions: QuestionType[];
  handlers: UseListStateHandlers<QuestionType>;
}

export default function FormAddContentTestPage({ questions, handlers }: DndListHandleProps) {
  const { classes, cx } = useStyles();

  const getComponent = (item: QuestionType, index: number) => {
    switch (item.type) {
      case QUESTION_TYPE.DropdownSelect:
        return <DropdownSelect question={item} questionNo={index + 1} />;
      case QUESTION_TYPE.FillInGap:
        return <FillInGap question={item} questionNo={index + 1} />;
      case QUESTION_TYPE.SelectMany:
        return <SelectMany question={item} questionNo={index + 1} />;
      case QUESTION_TYPE.SelectOne:
        return <SelectOne question={item} questionNo={index + 1} />;
      default:
        break;
    }
  };

  const items = questions.map((item, index) => (
    <Draggable key={item._id} index={index} draggableId={item._id as string}>
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
          <div>{getComponent(item, index)}</div>
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
          <ModalAddTestContent onConfirm={(data) => handlers.setState(data)} />
        </Flex>
      </Accordion>
    </Box>
  );
}
