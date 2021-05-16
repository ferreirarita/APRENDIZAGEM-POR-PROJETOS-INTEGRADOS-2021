/* eslint-disable object-curly-newline */
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid, InputLabel } from '@material-ui/core';
import TaskList from 'src/components/dashboard//LatestOrders';
import Sales from 'src/components/dashboard//Sales';
import TrafficByDevice from 'src/components/dashboard//TrafficByDevice';
import StatsCard from 'src/components/StatsCard';
import './styles.css';
import { api } from 'src/services/api';
import AuthContext from 'src/contexts/auth';
import ProjectList from 'src/components/Projects/ProjectList';
import sortWorkedHours from 'src/utils/sortWorkedHours';

const Dashboard = () => {
  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState([]);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const getProjects = async () => {
      const response = await api.get('/project/hours', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const projectArray = response.data;

      const sortedProjects = projectArray.sort(sortWorkedHours);

      setProjects(sortedProjects);
    };

    getProjects();
  }, [token]);

  const getProject = async (id) => {
    const response = await api.get('/listar', {
      headers: {
        Authorization: `Bearer ${token}`,
        projectId: id
      }
    });

    setProject(response.data);
  };

  return (
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
            <InputLabel id="label" className="select-input-dash">
              Selecione o projeto:
              {project ? ` ${project.tasks.project}` : null}
            </InputLabel>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <ProjectList projects={projects} chooseProject={getProject} />
            </Grid>
          </Box>
          {!project ? null : (
            <Grid container spacing={3}>
              <Grid item lg={2} sm={6} xl={3} xs={12}>
                <StatsCard
                  label="IN_PROGESS"
                  value={project.stats.IN_PROGRESS}
                />
              </Grid>
              <Grid item lg={2} sm={6} xl={3} xs={12}>
                <StatsCard
                  label="QA_TESTING"
                  value={project.stats.QA_TESTING}
                />
              </Grid>
              <Grid item lg={2} sm={6} xl={3} xs={12}>
                <StatsCard
                  label="QA_DEPLOYING"
                  value={project.stats.QA_DEPLOYING}
                />
              </Grid>
              <Grid item lg={2} sm={6} xl={3} xs={12}>
                <StatsCard
                  label="RELEASE_TO_PROD"
                  value={project.stats.RELEASE_TO_PROD}
                />
              </Grid>
              <Grid item lg={2} sm={6} xl={3} xs={12}>
                <StatsCard label="FOR_TEST" value={project.stats.FOR_TEST} />
              </Grid>
              <Grid item lg={2} sm={6} xl={3} xs={12}>
                <StatsCard
                  label="PROD_DEPLOYING"
                  value={project.stats.PROD_DEPLOYING}
                />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <Sales stats={project.stats} />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <TrafficByDevice sx={{ height: '100%' }} />
              </Grid>
              {project ? (
                <Grid item lg={12} md={12} xl={9} xs={12}>
                  <TaskList project={project} />
                </Grid>
              ) : null}
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
