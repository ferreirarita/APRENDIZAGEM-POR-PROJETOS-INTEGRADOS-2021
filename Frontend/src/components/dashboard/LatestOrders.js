/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import Project from '../../__mocks__/Project';
import colors from '../../constants/color';

const TaskList = (props) => (
  <Card {...props}>
    <CardHeader title="Tarefas do Projeto" />
    <Divider />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descrição</TableCell>
              <TableCell>Tempo decorrido</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Project.tasks.map((task, index) => (
              <TableRow hover key={index}>
                <TableCell>{task.descricao}</TableCell>
                <TableCell>{`${task.hora}h`}</TableCell>
                <TableCell>
                  <Chip
                    style={{
                      color: task.status === 'QA_DEPLOYING' || task.status === 'QA_TESTING' ? '#000000' : '#ffffff',
                      backgroundColor:
                        task.status === 'IN_PROGRESS' || task.status === 'FOR_TEST'
                          ? colors.warning
                          : task.status === 'PROD_DEPLOYING' || task.status === 'RELEASE_TO_PROD'
                            ? colors.primary
                            : task.status === 'QA_DEPLOYING' || task.status === 'QA_TESTING'
                              ? colors.default
                              : colors.success
                    }}
                    label={task.status}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    />
  </Card>
);

export default TaskList;
