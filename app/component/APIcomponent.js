"use client"
import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'


const APIcomponent = ({image,onTagDetected}) => {
    const [result,setResult]=useState(null)
    const [isProcessed, setIsProcessed] = useState(false); 
    const [error, setError] = useState(null);
const url=`https://inventoryvision-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/3a65edba-f4af-4477-9807-40a75fb5b676/classify/iterations/Iteration1/image`;
   

useEffect(()=>{
  if (!image || isProcessed) return; 
    const fetchItem= async()=>{
        
          const base64Image = image.split(',')[1]; // Get the base64 part
            const binaryData = Buffer.from(base64Image, 'base64');
        try{
          const response= await fetch(url,
              {
                method:'POST',
                  headers:{
                      'Prediction-Key':'',
                       'Content-Type':'application/octet-stream'
                  },
                  body:binaryData
              }
          ) 

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

        const data= await response.json();
        console.log(data);
        setResult(data);
        setIsProcessed(true); 
        if (onTagDetected) {
          const highestProbabilityTag = await data.predictions[0].tagName;
          onTagDetected(highestProbabilityTag); // Pass the tagName to the parent
        }
      }catch(error){
            console.error('item couldnt be fetched:',error)
            setError('failed fetch')
        }
  }

  fetchItem()
   },[image,onTagDetected,isProcessed ])

  return (
    <Box>
    <Box>
        {error && <Box>Error: {error}</Box>}
        {result?(<Box>
            <Typography >Item present in Picture is: <span sx={{color:'#003366', textAlign:'center'}}>{result.predictions[0].tagName}</ span></Typography></Box> )
        :( <Box>Loading</Box> ) }
 
    </Box>
    </Box>

  )
}

export default APIcomponent