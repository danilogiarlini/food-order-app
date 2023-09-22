import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveDigits = (value) => value.trim().length === 5;


const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true
    })

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalcodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalcode = postalcodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalcodeIsValid = isFiveDigits(enteredPostalcode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        postalCode: enteredPostalcodeIsValid,
        city: enteredCityIsValid
    })

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalcodeIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalcode,
      city: enteredCity
    })
  };



  const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`
  const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`
  const postalcodeControlClasses = `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`
  const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`


  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalcodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalcodeInputRef} />
        {!formInputsValidity.postalCode && <p>Please enter a valid postal code!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
