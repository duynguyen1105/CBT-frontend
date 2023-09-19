import {ActionIcon, Flex, Table as MTable, Pagination, Text} from '@mantine/core';
import {IconArrowsSort, IconPencilMinus, IconTrash} from '@tabler/icons-react';

type Props = {
  ths: {
    label: string;
    onClick: () => void;
  }[];
  rows: ({id: string} & {[key: string]: string | number | JSX.Element})[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export const Table = ({ths, rows, onEdit, onDelete}: Props) => {
  return (
    <Flex direction="column" gap="32px" align="center">
      <MTable striped highlightOnHover>
        <thead>
          <tr>
            {ths.map((th) => (
              <th key={th.label}>
                <Flex align="center" gap="xs">
                  <Text>{th.label}</Text>
                  <ActionIcon onClick={th.onClick}>
                    <IconArrowsSort size="15px" />
                  </ActionIcon>
                </Flex>
              </th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {Object.values(row).map((v, idx) => (
                <td key={idx}>{v}</td>
              ))}
              <td>
                <Flex>
                  <ActionIcon color="green" onClick={() => onEdit(row.id)}>
                    <IconPencilMinus size="15px" />
                  </ActionIcon>
                  <ActionIcon color="red" onClick={() => onDelete(row.id)}>
                    <IconTrash size="15px" />
                  </ActionIcon>
                </Flex>
              </td>
            </tr>
          ))}
        </tbody>
      </MTable>
      <Pagination total={10} />
    </Flex>
  );
};
