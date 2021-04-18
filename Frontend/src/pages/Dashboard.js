import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box, Container, Grid, Typography
} from '@material-ui/core';
import TaskList from 'src/components/dashboard//LatestOrders';
import Sales from 'src/components/dashboard//Sales';
import TrafficByDevice from 'src/components/dashboard//TrafficByDevice';
import StatsCard from 'src/components/StatsCard';
import Project from '../__mocks__/Project';

const Dashboard = () => {
  const [project, setProject] = useState();

  useEffect(() => {
    setProject(Project);
  }, []);

  return (
    <>
      {
        project
          ? (
            <>
              <Helmet>
                <title>DashW</title>
              </Helmet>
              <Box
                sx={{
                  backgroundColor: 'background.default',
                  minHeight: '100%',
                  py: 3
                }}
              >

                <Container maxWidth={false}>
                  <Box sx={{ marginTop: 0, marginBottom: 2 }}>
                    <Typography color="textSecondary" gutterBottom variant="h2">
                      {Project.nomeProjeto}
                    </Typography>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item lg={2} sm={6} xl={3} xs={12}>
                      <StatsCard label="IN_PROGESS" value={project.stats.IN_PROGRESS} />
                    </Grid>
                    <Grid item lg={2} sm={6} xl={3} xs={12}>
                      <StatsCard label="QA_TESTING" value={project.stats.QA_TESTING} />
                    </Grid>
                    <Grid item lg={2} sm={6} xl={3} xs={12}>
                      <StatsCard label="QA_DEPLOYING" value={project.stats.QA_DEPLOYING} />
                    </Grid>
                    <Grid item lg={2} sm={6} xl={3} xs={12}>
                      <StatsCard label="RELEASE_TO_PROD" value={project.stats.RELEASE_TO_PROD} />
                    </Grid>
                    <Grid item lg={2} sm={6} xl={3} xs={12}>
                      <StatsCard label="FOR_TEST" value={project.stats.FOR_TEST} />
                    </Grid>
                    <Grid item lg={2} sm={6} xl={3} xs={12}>
                      <StatsCard label="PROD_DEPLOYING" value={project.stats.PROD_DEPLOYING} />
                    </Grid>
                    <Grid item lg={8} md={12} xl={9} xs={12}>
                      <Sales />
                    </Grid>
                    <Grid item lg={4} md={6} xl={3} xs={12}>
                      <TrafficByDevice sx={{ height: '100%' }} />
                    </Grid>
                    <Grid item lg={12} md={12} xl={9} xs={12}>
                      <TaskList />
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </>
          )
          : null
      }
    </>
  );
};

export default Dashboard;
