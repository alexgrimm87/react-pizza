import {FC} from "react";
import {Link} from "react-router-dom";
import cartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty: FC = () => (
  <div className="cart cart--empty">
    <h2>Your shopping cart is empty <span>😕</span></h2>
    <p>
      You probably haven't ordered a pizza yet.<br />
      To order pizza, go to the home page.
    </p>
    <img src={cartEmptyImg} alt="Empty cart" />
    <Link to="/" className="button button--black">
      <span>Go back</span>
    </Link>
  </div>
)

export default CartEmpty;
