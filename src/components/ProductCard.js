
import { AddShoppingCartOutlined } from "@mui/icons-material";
import { CardActionArea } from "@mui/material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  const {name, cost, rating, image, _id}=product;
  
  return (
    <Card className="card" sx={{maxWidth:385}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image={image}
          alt={name}
        />
          
        <CardContent>
          <Typography gutterBottom variant="h5" compnonent="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="h6" compnonent="div">
            ${cost}
          </Typography>
          <Rating name="read=only" value={rating} readOnly />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="" fullWidth color="primary" variant="contaoned" value={_id} onClick={handleAddToCart}>
          <AddShoppingCartOutlined /> ADD TO CART
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
