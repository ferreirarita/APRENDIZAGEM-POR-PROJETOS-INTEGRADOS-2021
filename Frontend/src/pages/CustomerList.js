import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import { api } from 'src/services/api';
import AuthContext from 'src/contexts/auth';

const CustomerList = () => {
  const [users, setUsers] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const getUsers = async () => {
      const response = await api.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUsers(response.data.users);
    };

    getUsers();
  }, [token]);

  return (
    <>
      {
      users.length > 0
        ? (
          <>
            <Helmet>
              <title>Customers | Material Kit</title>
            </Helmet>
            <Box
              sx={{
                backgroundColor: 'background.default',
                minHeight: '100%',
                py: 3
              }}
            >
              <Container maxWidth={false}>
                <CustomerListToolbar />
                <Box sx={{ pt: 3 }}>
                  <CustomerListResults customers={users} />
                </Box>
              </Container>

            </Box>

          </>
        )

        : null
}
    </>
  );
};

export default CustomerList;
