import {ActionIcon, Button, Center, Flex, Table} from '@mantine/core';
import {IconCirclePlus, IconEdit, IconTrash} from '@tabler/icons-react';
import {FC} from 'react';

export interface MemberData {
  id: string;
  fullName: string;
  email: string;
}

export interface TableMemberProps {
  data: MemberData[];
}

const TableMember: FC<TableMemberProps> = (props) => {
  const {data} = props;

  const rows = data.map((element) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{element.fullName}</td>
      <td>{element.email}</td>
      <td>
        <Flex justify="center">
          <ActionIcon color="blue" onClick={() => console.log(element)}>
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon color="red" onClick={() => console.log(element)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Flex>
      </td>
    </tr>
  ));
  return (
    <>
      <Table withBorder withColumnBorders>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full name</th>
            <th>Email</th>
            <th>
              <Center>Actions</Center>
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Button size="xs" mt={8} rightIcon={<IconCirclePlus size={16} />}>
        Add
      </Button>
    </>
  );
};

export default TableMember;
