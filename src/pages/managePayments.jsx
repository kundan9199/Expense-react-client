import { useState ,useEffect } from "react";


function managePayments() {
  const [Loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [userProfile, setUserProfile] = useState(null);

  const getUserProfile = async () => {
    try {
      const response = await axios.get(
        `${serverEndpoint}/profile/get-user-info`,
        { withCredentials: true },
      );
      setUserProfile(Response.data.user);
    } catch (error) {
      console.log(error);
      setErrors({ message: "Unable to fetch user Profile" });
    }
  };
  useEffect(() => {
    getUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="containser p-5 text-center">
        <div className="spinner-border" role="status">
          <span classname="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container p-5">
      {errors.message && (
        <div classname="alert alert-danger" role="alert">
          {errors.message}
        </div>
      )}
    </div>
  );
}

export default managePayments;
