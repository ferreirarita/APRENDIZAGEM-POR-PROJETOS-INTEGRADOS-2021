import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import TaskCard from '../components/TaskCard';
import Project from '../__mocks__/Project';

const ProductList = () => (
  <>
    <Helmet>
      <title>Products | Material Kit</title>
    </Helmet>

    <Box
      sx={{
        backgroundColor: '#000',
        minHeight: '100%',
        py: 3,
        flexDirection: 'row',
        display: 'flex',
        width: 3000
      }}
    >
      <Container style={{ maxWidth: '25%' }}>
        <Box sx={{ pt: 3 }}>
          <Grid lg={12} style={{ flexDirection: 'row', marginLeft: 0 }}>
            <Grid item lg={12} style={{ backgroundColor: '#F5F8FA', padding: 15, borderRadius: 3 }}>
              <Typography color="textSecondary" style={{ textAlign: 'center' }} gutterBottom variant="h5">IN_PROGESS</Typography>
              {
              Project.tasks.map((task) => (
                task.status === 'IN_PROGRESS'
                  ? (
                    <Grid item lg={12} sm={6} xl={3} xs={12} sx={{ margin: 1 }}>
                      <TaskCard description={task.descricao} workedHours={task.hora} />
                    </Grid>
                  )
                  : null
              ))
            }
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container style={{ maxWidth: '30%' }}>
        <Box sx={{ pt: 3 }}>
          <Grid lg={10} style={{ flexDirection: 'row', marginLeft: 0 }}>
            <Grid item lg={12} style={{ backgroundColor: '#F5F8FA', padding: 15, borderRadius: 3 }}>
              <Typography color="textSecondary" style={{ textAlign: 'center' }} gutterBottom variant="h5">QA_TESTING</Typography>
              {
              Project.tasks.map((task) => (
                task.status === 'QA_TESTING'
                  ? (
                    <Grid item lg={12} sm={6} xl={3} xs={12}>
                      <TaskCard description={task.descricao} workedHours={task.hora} />
                    </Grid>
                  )
                  : null
              ))
            }
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container style={{ maxWidth: '30%' }}>
        <Box sx={{ pt: 3 }}>
          <Grid lg={10} style={{ flexDirection: 'row', marginLeft: 0 }}>
            <Grid item lg={12} style={{ backgroundColor: '#F5F8FA', padding: 15, borderRadius: 3 }}>
              <Typography color="textSecondary" style={{ textAlign: 'center' }} gutterBottom variant="h5">QA_DEPLOYING</Typography>
              {
              Project.tasks.map((task) => (
                task.status === 'QA_DEPLOYING'
                  ? (
                    <Grid item lg={12} sm={6} xl={3} xs={12}>
                      <TaskCard description={task.descricao} workedHours={task.hora} />
                    </Grid>
                  )
                  : null
              ))
            }
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container style={{ maxWidth: '30%' }}>
        <Box sx={{ pt: 3 }}>
          <Grid lg={10} style={{ flexDirection: 'row', marginLeft: 0 }}>
            <Grid item lg={12} style={{ backgroundColor: '#F5F8FA', padding: 15, borderRadius: 3 }}>
              <Typography color="textSecondary" style={{ textAlign: 'center' }} gutterBottom variant="h5">RELEASE_TO_PROD</Typography>
              {
              Project.tasks.map((task) => (
                task.status === 'RELEASE_TO_PROD'
                  ? (
                    <Grid item lg={12} sm={6} xl={3} xs={12}>
                      <TaskCard description={task.descricao} workedHours={task.hora} />
                    </Grid>
                  )
                  : null
              ))
            }
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Container style={{ maxWidth: '30%' }}>
        <Box sx={{ pt: 3 }}>
          <Grid lg={10} style={{ flexDirection: 'row', marginLeft: 0 }}>
            <Grid item lg={12} style={{ backgroundColor: '#F5F8FA', padding: 15, borderRadius: 3 }}>
              <Typography color="textSecondary" style={{ textAlign: 'center' }} gutterBottom variant="h5">FOR_TEST</Typography>
              {
              Project.tasks.map((task) => (
                task.status === 'FOR_TEST'
                  ? (
                    <Grid item lg={12} sm={6} xl={3} xs={12}>
                      <TaskCard description={task.descricao} workedHours={task.hora} />
                    </Grid>
                  )
                  : null
              ))
            }
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Container style={{ maxWidth: '30%' }}>
        <Box sx={{ pt: 3 }}>
          <Grid lg={10} style={{ flexDirection: 'row', marginLeft: 0 }}>
            <Grid item lg={12} style={{ backgroundColor: '#F5F8FA', padding: 15, borderRadius: 3 }}>
              <Typography color="textSecondary" style={{ textAlign: 'center' }} gutterBottom variant="h5">PROD_DEPLOYING</Typography>
              {
              Project.tasks.map((task) => (
                task.status === 'PROD_DEPLOYING'
                  ? (
                    <Grid item lg={12} sm={6} xl={3} xs={12}>
                      <TaskCard description={task.descricao} workedHours={task.hora} />
                    </Grid>
                  )
                  : null
              ))
            }
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container style={{ maxWidth: '30%' }}>
        <Box sx={{ pt: 3 }}>
          <Grid lg={10} style={{ flexDirection: 'row', marginLeft: 0 }}>
            <Grid item lg={12} style={{ backgroundColor: '#F5F8FA', padding: 15, borderRadius: 3 }}>
              <Typography color="textSecondary" style={{ textAlign: 'center' }} gutterBottom variant="h5">DONE</Typography>
              {
              Project.tasks.map((task) => (
                task.status === 'DONE'
                  ? (
                    <Grid item lg={12} sm={6} xl={3} xs={12}>
                      <TaskCard description={task.descricao} workedHours={task.hora} />
                    </Grid>
                  )
                  : null
              ))
            }
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  </>
);

export default ProductList;
