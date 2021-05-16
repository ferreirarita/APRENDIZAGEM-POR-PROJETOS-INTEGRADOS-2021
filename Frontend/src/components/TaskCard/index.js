/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
  Select,
  MenuItem
} from '@material-ui/core';
import statusList from 'src/__mocks__/StatusList';
import { api } from 'src/services/api';
import AuthContext from 'src/contexts/auth';

const TaskCard = ({
  description,
  workedHours,
  currentStatus,
  taskId,
  updateAll
}) => {
  const [newStatus, setNewStatus] = useState(null);

  const { token } = useContext(AuthContext);

  const handleUpdate = (id, status) => {
    const data = {
      status
    };

    api
      .put(`/task/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(updateAll(id, status))
      .catch((e) => console.log(e));

    setNewStatus(status);
  };

  return (
    <Card>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ alignItems: 'flex-start', flexDirection: 'column' }}
        >
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h5">
              {description}
            </Typography>
          </Grid>
          <Grid
            container
            sx={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: 2.5
            }}
          >
            <Typography color="textSecondary" gutterBottom variant="h5">
              Tempo trabalhado
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="h5">
              {workedHours}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <div className="box-dropdown-status">
          <Select
            onChange={(value) => handleUpdate(taskId, value.target.value)}
            id="select"
            value="null"
            className="style-dropdown-status"
            variant="outlined"
          >
            <MenuItem value={null} disabled>
              {newStatus || currentStatus}
            </MenuItem>
            {statusList.map((status) => (
              <MenuItem value={status}>{status}</MenuItem>
            ))}
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
