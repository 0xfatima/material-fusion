"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Box } from "@mui/material";

const CustomCard = ({ imgSrc: ImgSrc, title, description }) => {
  return (
    <Card
      sx={{
        maxWidth: 320,
        height: 280,
        boxShadow: 10,
        transition: "0.3s", 
        "&:hover": {
          transform: "scale(1.02)", // Slightly scale up on hover
          
        }
      }}
    >
      <CardActionArea
      
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          pt:5
        }}
      >
        <Box >{ImgSrc}</Box>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CustomCard;
