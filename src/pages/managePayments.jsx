import { useEffect } from "react";
import axios from "axios";
import { serverEndpoint } from "../config/appConfig";

const CREDIT_PACK = [
  {
    price: 1,
    credits: 10,
  },
  {
    price: 4,
    credits: 50,
  },
  {
    price: 7,
    credits: 100,
  },
];

function ManagePayments() {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [userProfile, setUserProfile] = useState(null);
  const [message, setMessage] = useState(null);



  const getUserProfile = async () => {
    try {
      await axios.get(`${serverEndpoint}/profile/get-user-info`, {
        withCredentialss: true,
      });
      setUserProfile(response.data.user);
    } catch (error) {
      console.log(error);
      setErrors({ message: "Unable to fetch User profile" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const PaymentResponseHandler = async (credits,payment) => {
    try{
       const response = await axios.post(
            `${serverEndpoint}/payments/verify-order`,
            {
                razorpay_order_id: payment.razorpay_order_id,
                razorpay_payment_id: payment.razorpay_payment_id,
                razorpay_signature: payment.razorpay_signature,
                credits: credits
            },
            {withCredentials: true}
        );
        setUserProfile(response.data.user);
        setMessage(`Payment success, ${credits} are credited to your account`);

    }
    catch(error){
        console.log(error);
        setErrors({message: ''})
    }
  }

  const handlePayment = async () => {
    try {
      setLoading(true);
      const orderResponse = await axios.post(
        `${serverEndpoint}/payments/create-order`,
        {
            credits: credits
        },
        {
            withCredentials: true
        }

      );

      const order = orderResponse.data.order;
      const options = {
        key :import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'MergeMoneydiv',
        description: `Order for purchasing ${credits} credits`,
        order_id: order.id,
        theme: {
            colour: '#3399cc'
        },
       handler: (response) => { paymentResponseHandler(credits, response) },

      }

      const razorpay = new window.Razorpay(options);
      razorpay.open();


    } catch (error) {
      console.log(error);
      setErrors({ message: "unable to process the payment request" });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="conatiner p-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="conatiner p-5">
      {message && (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      )}

      <h2>Manage PAyments</h2>
      <p>
        <strong>Current Credits Balance: </strong>
        {userProfile.credits || 0}
      </p>

      {CREDIT_PACK.map((credit, index) => {
        <div key={index} className="col-auto border m-2 p-2">
          <h4>{credit.credits} Credits</h4>
          <p>
            Buy {credit.credits} Credits for INR {credit.price}
          </p>
          <button className="btn btn-outline-primary"
          onClick = {() => {handlePayment(credit.credits); }}>Buy Now</button>
        </div>;
      })}
    </div>
  );
}

export default ManagePayments;
