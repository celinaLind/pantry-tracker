// create a page that calls for recipes after user selects what ingredients to include
'use client';
import React, { useState, useEffect } from 'react';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { main } from './api'
import { firestore } from '@/firebase';
import { getDocs, collection } from 'firebase/firestore';
import { Block } from '@mui/icons-material';

export default function RecipePage() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [generatePressed, setGeneratePressed] = useState(false);

  useEffect(() => {
    const fetchIngredients = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'pantry'));
      const pantryItems = querySnapshot.docs.map(doc => doc.id);
      setIngredients(pantryItems);
    };
    fetchIngredients();
  }, []);

  const handleIngredientChange = (event) => {
    const ingredient = event.target.name;
    if (event.target.checked) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    } else {
      setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
    }
  };

  const handleGenerateRecipe = async () => {
    if (selectedIngredients.length > 0) {
      try {
        console.log('Selected Ingredients:', selectedIngredients);
        const generatedRecipe = await main(selectedIngredients);
        setRecipe(generatedRecipe);
      } catch (error) {
        console.error('Error generating recipe:', error);
        setRecipe('Failed to generate recipe. Please try again.');
      }
    } else {
      setRecipe('Please select at least one ingredient.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Let's Find a Recipe
      </Typography>
      <Typography variant='h5'>
        Pick items to include in recipe:
      </Typography>
      <FormGroup>
        {ingredients.map((ingredient) => (
          <FormControlLabel
            key={ingredient}
            control={
              <Checkbox
                checked={selectedIngredients.includes(ingredient)}
                onChange={handleIngredientChange}
                name={ingredient}
              />
            }
            label={ingredient}
          />
        ))}
      </FormGroup>
      <Button
        variant="contained"
        onClick={handleGenerateRecipe}
        sx={{ marginTop: 2 }}
      >
        Generate
      </Button>
      <br />
      <Typography variant='caption' display={generatePressed? 'block': 'none'}>Press again to generate a new recipe.</Typography>
      {recipe && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h5" gutterBottom>
            Generated Recipe:
          </Typography>
          <Typography variant="body1" whiteSpace="pre-wrap">
            {recipe}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

