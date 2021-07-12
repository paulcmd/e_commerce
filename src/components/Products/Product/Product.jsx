import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/icons";
import { AddShoppingCart } from "@material-ui/icons";
import { classes } from "coa";

const Product = ({ name }) => {
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image="" title={name} />
      <CardContent>
        <div className={classes.cardContent}>
                  <Typography variant="h5" gutterBottom>{name}</Typography>
                  <Typography variant="h5" >{ price }</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default Product;
