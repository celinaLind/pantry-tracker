'use client';
import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { lightBlue, lime } from '@mui/material/colors';
import { app, firestore } from '../firebase';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';

export default function Home() {
  const [pantryItems, setPantryItems] = useState([]);
  useEffect(() => {
    const updateItems = async () => {
      const querySnapshot = await getDocs(collection(firestore, "pantry"));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.id);
      });
      console.log(items);
      setPantryItems(items);
    };
    updateItems();
  }, []);
  return (
    <Box width='100vw' height='100vh' display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
      <Box border={1} overflow="hidden">
        <Box height={'100px'} width={'800px'} alignContent={'center'} sx={{ textAlign: 'center', backgroundColor: lime[100] }}>
          <Typography variant='h2'>Pantry Tracker</Typography>
        </Box>
        <Box width="100%" height="300px" sx={{ overflow: 'auto' }}>
        <Stack spacing={2}>
          {pantryItems.map((item, index) => (
            <Box key={index} sx={{ textAlign: 'center', backgroundColor: lightBlue[50]}}>
              <Typography variant="h4">{ item }</Typography>
            </Box>
          ))}
        </Stack>
        </Box>
      </Box></Box>
  );
}
