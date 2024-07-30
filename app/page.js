import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { lightBlue, lime } from '@mui/material/colors';

const items = [ "item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9", "item10" ];

export default function Home() {
  return (
    <Box width='100vw' height='100vh' display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
      <Box border={1} overflow="hidden">
        <Box height={'100px'} width={'800px'} alignContent={'center'} sx={{ textAlign: 'center', backgroundColor: lime[100] }}>
          <Typography variant='h2'>Pantry Tracker</Typography>
        </Box>
        <Box width="100%" height="300px" sx={{ overflow: 'auto' }}>
        <Stack spacing={2}>
          {items.map((item, index) => (
            <Box key={index} sx={{ textAlign: 'center', backgroundColor: lightBlue[50]}}>
              <Typography variant="h4">{ item }</Typography>
            </Box>
          ))}
        </Stack>
        </Box>
      </Box></Box>
  );
}
