import React from "react";
import classes from "./StudentList.module.css";
import { Button } from "react-bootstrap";

const StudentListItem = ({ student, onAddToCart }) => {
  const { id, Name, Email, Phone, imgUrl } = student;

  const handleOnAddToCart = () => onAddToCart(id);

  return (
    <li className={classes.list_item}>
      <div className={classes.list_item_cover}>
        <img src={imgUrl} alt={`student-${Name}`} />
      </div>

      <div className={classes.list_item_detail}>
        <h4>{Name}</h4>
        <div className={classes.list_item_email}>{Email}</div>
        <div className={classes.list_item_phone}>{Phone}</div>

        <Button onClick={handleOnAddToCart}>Add to cart.</Button>
      </div>
    </li>
  );
};

export default StudentListItem;
