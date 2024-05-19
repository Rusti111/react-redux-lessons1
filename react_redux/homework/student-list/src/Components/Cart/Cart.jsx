import { useEffect, useState} from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import fetchAllCartItems, { fetchToAddItem, fetchToRemuveItem, fetchToDeleteItem } from "../../store/reducers/CartCreator";
import classes from "./Cart.module.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, cartError, cartStatus } = useSelector(
    (state) => state.cartList
  );

  const countTotalCost = (cart) => {
    let totalCost = 0;
    cart.forEach((item) => {
      totalCost += item.total;
    });

    return totalCost;
  };

  console.log(cart);
  useEffect(() => {
    dispatch(fetchAllCartItems());
  }, []);

  const renderItem = (item, idx) => {
    const { Name, id, Email, Phone, total } = item;
    console.log(item);
    const onAddToCart = () => dispatch(fetchToAddItem(id));
    const onRemuveCart = () => dispatch(fetchToRemuveItem(id));
    const onDeleteCart = () => dispatch(fetchToDeleteItem(id));

    return (
      <tr key={`item-${id}`}>
        <td>{idx + 1}</td>
        <td>{Name}</td>
        <td>{Email}</td>
        <td>{Phone}</td>
        <td>
          <Button
            onClick={onAddToCart}
            className="mx-1"
            variant="outlin-success"
          >
            <i className="fa-solid fa-plus"></i>
          </Button>
          <Button
            onClick={onRemuveCart}
            className="mx-1"
            variant="outlin-success"
          >
            <i className="fa-solid fa-minus"></i>
          </Button>
          <Button
            onClick={onDeleteCart}
            className="mx-1"
            variant="outlin-success"
          >
            <i className="fa-solid fa-trash"></i>
          </Button>
        </td>
      </tr>
    );
  };

  const totalCost = countTotalCost(cart);

  const Cases = {
    pending: <Spinner style={{ margin: "100px auto" }} />,
    fulfilled: cart.map((item) => renderItem(item)),
    rejected: <div style={{ textAlign: "center" }}>{cartError}</div>,
    empty: <div style={{ textAlign: "center" }}>No data.</div>,
  };

  return (
    <div>
      <h1>Your order.</h1>

      <Table>
        <thead>
          <tr>
            <th>№</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>{cart.map(renderItem)}</tbody>
      </Table>
      <div className={classes.Price}>Total cart items cost: {totalCost}$</div>
    </div>
  );
};

export default Cart;
