import { useContext } from 'react';

import { Navigate, useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    const { cartItems, cartTotal } = useContext(CartContext);

    //Checkout Handler 
    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <span className='empty-message'>Your cart is empty</span>
        )}
          </div>
          <div className='total'>TOTAL: ${cartTotal}</div>
          <Button onClick={goToCheckoutHandler} > CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
