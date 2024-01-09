import {FC, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const FullPizza: FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string,
    title: string,
    price: number
  }>();
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const {data} = await axios.get('https://6579daa31acd268f9afa43a6.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Error when getting the pizza!');
        navigate('/');
      }
    }

    fetchPizza();
  }, [])

  if (!pizza) {
    return <>Loading...</>;
  }

  return (
    <div className="full-pizza container">
      <img src={pizza.imageUrl} alt="Pizza" />
      <h2>{pizza.title}</h2>
      <br />
      <h4>${pizza.price}</h4>
      <br />
      <Link className="button button--black" to="/">Go back</Link>
    </div>
  )
}

export default FullPizza;
