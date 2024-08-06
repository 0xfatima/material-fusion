"use client";
import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import { Box, Button, Container } from "@mui/material";
import APIcomponent from "../component/APIcomponent";
import { useRouter } from 'next/navigation'; // Import useRouter to navigate


const CameraComponent = () => {
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [tagName, setTagName] = useState(null);
  const router = useRouter(); // Create a router instance
  const [itemAdded, setItemAdded] = useState(false); // Flag to prevent multiple additions

  const handleOpen = () => {
    setCameraOpen(true);
  };

  const handleClose = () => {
    setCameraOpen(false);
  };

  const takePhoto = () => {
    setImage(camera.current.takePhoto());
    handleClose();
  };

  const handleAddToInventory = () => {
    if (tagName && !itemAdded) {

      setItemAdded(true);
  
        router.push(`/inventory?page=addItem&name=${encodeURIComponent(tagName)}`);
        console.log("Navigated to inventory page with tag:", tagName);

      setTagName(null);
    }
  };
  
const handleTagDetection=(onTagDetected)=>{
     if(onTagDetected){
      setTagName(onTagDetected)
     }
}

  return (
    <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", pt: 2 }}>
      {!cameraOpen && (
        <Button sx={{ zIndex: '1000', bgcolor: "#003366" }} variant="contained" onClick={handleOpen}>
          Open Camera
        </Button>
      )}

      {cameraOpen && (
        <Box position="fixed" display="flex" flexDirection="column" height="100%" pt={5} width="100%" justifyContent="center" alignItems="center" top={0} left={0} gap={3}>
          <Box position="relative" display="flex" flexDirection="column" height="100%" width="100%" maxHeight="400px" maxWidth="600px" justifyContent="center" alignItems="center">
            <Camera ref={camera} style={{ width: '100%', height: '100%' }} />
          </Box>
          <Button variant="outlined" sx={{ border: "1px solid #003366" }} position="absolute" bottom="10%" onClick={takePhoto}>
            Take Photo
          </Button>
        </Box>
      )}

      {(!cameraOpen && image) && (
        <Box position="fixed" display="flex" flexDirection="column" height="100%" pt={10} width="100%" justifyContent="center" alignItems="center" top={0} left={0} gap={3}>
          <Box position="relative" display="flex" flexDirection="column" height="100%" width="100%" maxHeight="400px" maxWidth="600px" justifyContent="center" alignItems="center">
            <img src={image} alt='Taken photo' />
            <APIcomponent image={image} onTagDetected={handleTagDetection} />
          </Box>
          {tagName && (
            <Button onClick={()=>{handleAddToInventory()}} variant="contained">
              Add {tagName} to Inventory
            </Button>
          )}
        </Box>
      )}
    </Container>
  );
};

export default CameraComponent;
