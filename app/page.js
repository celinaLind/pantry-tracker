'use client';
import * as React from 'react';
import { Box, Button, Typography, TextField, Container, Tabs, Tab, CustomTabPanel, Card, CardHeader, CardContent, CardActions } from '@mui/material';
import { firestore, auth } from '../firebase';
import { useEffect, useState } from 'react';
import { collection, getDoc, doc, query, setDoc, deleteDoc, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Pantry from './pantry/page';
import RecipePage from './recipes/page';


export default function Home() {
const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(firestore, 'users', 'user1');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data());
      }
    }
    fetchData();
  }, []);
 return (
  <Container id="main-body" maxWidth="100vw" height="100vh">
    
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
    <Tab label="Home" {...a11yProps(0)} />
    <Tab label="Pantry" {...a11yProps(1)} />
    <Tab label="Recipes" {...a11yProps(2)} />
  </Tabs>
</Box>
<CustomTabPanel value={value} index={0}>
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, margin: 'auto' }}>
      <Typography variant="h3">Welcome to Our Pantry</Typography>
    </Box>
</CustomTabPanel>
<CustomTabPanel value={value} index={1}>
  <Pantry></Pantry>
</CustomTabPanel>
<CustomTabPanel value={value} index={2}>
<RecipePage></RecipePage>
</CustomTabPanel>
    
  </Container>
  
 );

}
