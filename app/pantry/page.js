'use client';
import * as React from 'react';
import { Box, Button, Modal, Stack, Typography, TextField } from '@mui/material';
import { firestore} from '../../firebase';
import { useEffect, useState } from 'react';
import { collection, getDoc, doc, query, setDoc, deleteDoc, getDocs } from 'firebase/firestore';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#FAEDCE !important',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  }
  
  export default function Pantry() {
    const [pantry, setPantry] = useState([]);
    const [open, setOpen] = useState(false);
    const [itemName, setItemName] = useState('');
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const addItem = async (item) => {
      const docRef = doc(collection(firestore, 'pantry'), item);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity } = docSnap.data()
        await setDoc(docRef, { quantity: quantity + 1 })
      } else {
        await setDoc(docRef, { quantity: 1 })
      }
      await updatePantry();
    }
  
    const removeItem = async (item) => {
      const docRef = doc(collection(firestore, 'pantry'), item);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity } = docSnap.data()
        if (quantity > 1) {
          await setDoc(docRef, { quantity: quantity - 1 })
        } else {
          await deleteDoc(docRef);
        }
      }
      await updatePantry();
    }
  
    const updatePantry = async () => {
      const querySnapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(querySnapshot)
    const pantryList = []
    docs.forEach((doc) => {
      pantryList.push({ name: doc.id, ...doc.data() })
    })
    setPantry(pantryList);
  }
  
    useEffect(() => {
      updatePantry();
    }, []);
  
    return (
      <Box
        width="100vw"
        height="100vh"
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        alignItems={'center'}
        gap={2}
      >
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Item
            </Typography>
            <Stack width="100%" direction={'row'} spacing={2}>
              <TextField
                id="outlined-basic"
                label="Item"
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  addItem(itemName)
                  setItemName('')
                  handleClose()
                }}
              >
                Add
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Button variant="contained" bgcolor="#E0E5B6 !important" onClick={handleOpen}>
          Add New Item
        </Button>
        <Box border={'1px solid #333'}>
          <Box
            width="800px"
            height="100px"
            bgcolor={'#E0E5B6'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
              Pantry Items
            </Typography>
          </Box>
          <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>
            {pantry.map(({ name, quantity }) => (
              <Box
                key={name}
                width="100%"
                minHeight="100px"
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                bgcolor={'#FAEDCE'}
                paddingX={5}
              >
                <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
                  Quantity: {quantity}
                </Typography>
                <Button variant="contained" onClick={() => removeItem(name)}>
                  Remove
                </Button>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    );
    //   <Box width='100vw' height='100vh' display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={2}>
  
    //     <Box border={1} overflow="hidden">
    //       <Box height={'100px'} width={'800px'} alignContent={'center'} sx={{ textAlign: 'center', backgroundColor: lime[100] }}>
    //         <Typography variant='h2'>Pantry Tracker</Typography>
    //       </Box>
    //       <Box width="100%" height="300px" sx={{ overflow: 'auto' }}>
    //       <Stack spacing={2}>
    //         {pantryItems.map((item, index) => (
    //           <Box key={index} sx={{ textAlign: 'center', backgroundColor: lightBlue[50]}}>
    //             <Typography variant="h4">{ item }</Typography>
    //           </Box>
    //         ))}
    //       </Stack>
    //       </Box>
    //     </Box>
    //     <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
    //     {/* <AddItemDialog updateInventory={updateInventory}></AddItemDialog> */}
    //     {/* <Button variant="contained" color="primary" sx={{ margin: '20px' }} >Add Item</Button> */}
    //     <Button variant="contained" color="secondary" sx={{ margin: '20px' }}>Edit Item</Button>
    //     </Box>
    //     </Box>
    // );
  }
  