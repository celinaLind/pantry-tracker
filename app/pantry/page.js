'use client';
import * as React from 'react';
import { IconButton, Box, Button, Modal, Stack, Typography, TextField, Card, CardHeader, CardContent, CardActions, Select, MenuItem } from '@mui/material';
import { firestore } from '../../firebase';
import { useEffect, useState } from 'react';
import { collection, getDoc, doc, query, setDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { Delete, Edit, Add, Remove } from '@mui/icons-material';

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
  const [modalState, setModalState] = useState({
    add: false,
    edit: false
  })
  const [itemName, setItemName] = useState('');
  const [quantityAmt, setQuantityAmt] = useState('');
  const [editingItem, setEditingItem] = useState({
    name: '',
    quantity: ''
  });

  const handleEditOpen = (itemName, itemQuantity) => {
    setEditingItem({name: itemName, quantity: itemQuantity});
    handleModalOpen('edit');
  }

  const handleModalOpen = (modalType) => {
    setModalState(prev => ({ ...prev, [modalType]: true }));
  };

  const handleModalClose = (modalType) => {
    setModalState(prev => ({ ...prev, [modalType]: false }));
    setItemName('');
    setQuantityAmt('');
  };

  const addItem = async (item, addQuantity) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + addQuantity })
    } else {
      await setDoc(docRef, { quantity: addQuantity })
    }
    await updatePantry();
  }

  const removeItem = async (item, rmQuantity) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity > 1 && (quantity-rmQuantity) > 0) {
        await setDoc(docRef, { quantity: quantity - rmQuantity})
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
      width="100%"
      height="100%"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
    >
      <Modal
        open={modalState.add}
        onClose={() => handleModalClose('add')}
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
              required
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <TextField
              id='outlined-basic'
              label='Quantity'
              variant='outlined'
              type='number'
              inputProps={{ min: '0', step: '1' }}
              required
              fullWidth
              value={quantityAmt}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                setQuantityAmt(isNaN(value) ? 0 : value);
              }}
            />
          </Stack><Button
            variant="outlined"
            onClick={() => {
              addItem(itemName, quantityAmt)
              setQuantityAmt('')
              setItemName('')
              handleModalClose('add')
            }}
          >
            Add
          </Button>
        </Box>
      </Modal>
      <Card>
        <CardHeader title="Our Pantry" sx={{
          backgroundColor: '#E0E5B6',
          '& .MuiCardHeader-title': {
            fontSize: '4rem',
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'center'
          },
        }} />
        <CardContent>
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
                <Modal
        open={modalState.edit}
        onClose={() => handleModalClose('edit')}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id='outlined-basic'
              label='Quantity'
              variant='outlined'
              type='number'
              inputProps={{ min: '0', step: '1' }}
              required
              fullWidth
              value={quantityAmt}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                setQuantityAmt(isNaN(value) ? 0 : value);
              }}
            />
          </Stack>
          <Button
            variant="outlined"
            onClick={() => {
              addItem(editingItem.name, quantityAmt)
              setQuantityAmt('')
              setItemName('')
              handleModalClose('edit')
            }}
          >
            Add
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              removeItem(editingItem.name, quantityAmt)
              setQuantityAmt('')
              setItemName('')
              handleModalClose('edit')
            }}
          >
            Remove
          </Button>
        </Box>
      </Modal>
                <IconButton aria-label="addOne" onClick={() => addItem(name, 1)}>
                  <Add />
                </IconButton>
                <IconButton aria-label="removeOne" onClick={() => removeItem(name, 1)}>
                  <Remove />
                </IconButton>
                {/* TODO: when editing the named item is the last item in the list NOT 
                the current item being worked on need to change that */}
                <IconButton aria-label="edit" onClick={() => handleEditOpen(name, quantity)}>
                  <Edit />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => removeItem(name)}>
                  <Delete />
                </IconButton> 

              </Box>
            ))}
          </Stack>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" sx={{ 
      bgcolor: "#CCD5AE !important",
      '&:hover': {
        bgcolor: "#D0D5A6 !important",
      }
    }}  onClick={() => handleModalOpen('add')}>
            Add Item
          </Button>
        </CardActions>
      </Card>
      {/* <Box border={'1px solid #333'}>
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
          
        </Box> */}
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
