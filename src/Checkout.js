import styles from './Checkout.module.css';
import { LoadingIcon } from './Icons';
import { getProducts } from './dataService';
import { useEffect, useState } from 'react';

// You are provided with an incomplete <Checkout /> component.
// You are not allowed to add any additional HTML elements.
// You are not allowed to use refs.

// Once the <Checkout /> component is mounted, load the products using the getProducts function.
// Once all the data is successfully loaded, hide the loading icon.
// Render each product object as a <Product/> component, passing in the necessary props.
// Implement the following functionality:
//  - The add and remove buttons should adjust the ordered quantity of each product
//  - The add and remove buttons should be enabled/disabled to ensure that the ordered quantity can’t be negative and can’t exceed the available count for that product.
//  - The total shown for each product should be calculated based on the ordered quantity and the price
//  - The total in the order summary should be calculated
//  - For orders over $1000, apply a 10% discount to the order. Display the discount text only if a discount has been applied.
//  - The total should reflect any discount that has been applied
//  - All dollar amounts should be displayed to 2 decimal places
// You can view how the completed functionality should look at: https://drive.google.com/file/d/1o2Rz5HBOPOEp9DlvE9FWnLJoW9KUp5-C/view?usp=sharing



const Product = ({ id, name, availableCount, price, orderedQuantity, total }) => {


  let [state,setState]=useState([]);
  useEffect(() => {
    async function fetchMyAPI(resolve, reject) {
      let response = await getProducts()
      setState(response)
      return response
    }

    fetchMyAPI()
  }, [])


  let [btnstate,setBtnState] =useState(0);
  let [totalset,settotalset] = useState(0.00)

const inCrease=()=>{
setBtnState( btnstate+1)
settotalset(btnstate+99.9)
}
const decRease=()=>{
setBtnState(btnstate-1)
settotalset(btnstate+99.9)

}

return (<>
{
state.map((value)=>{
return    <tr>
      <td>{value.id}</td>
      <td>{value.name}</td>
      <td>{value.availableCount}</td>
      <td>${value.price}</td>
    <td>{value.orderedQuantity} {btnstate} </td>
      <td>${value.total} {totalset} </td>
      <td>
        <button className={styles.actionButton} onClick={inCrease}>+</button>
        <button className={styles.actionButton} onClick={decRease}>-</button>
      </td>
    </tr>

})
}

  </>);
}


const Checkout = () => {
  return (
    <div>
      <header className={styles.header}>
        <h1>Electro World</h1>
      </header>
      <main>
        <LoadingIcon />
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th># Available</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* Products should be rendered here */}
            <Product />




          </tbody>
        </table>
        <h2>Order summary</h2>
        <p>Discount: $ </p>
        <p>Total: $ </p>
      </main>
    </div>
  );
};

export default Checkout;
