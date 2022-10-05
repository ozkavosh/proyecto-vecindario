import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import createUserDocs from "../../utils/createUserDocs";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import "./SocialNetworkLogin.css";

const SocialNetworkLogin = () => {
  const navigate = useNavigate();

  const handleSocialNetwork = async (socialNetwork) => {
    try {
      switch (socialNetwork) {
        case "facebook":
          {
            const provider = new FacebookAuthProvider();
            const response = await signInWithPopup(auth, provider);

            await createUserDocs(response.user);

            navigate("/", { replace: true });
          }
          break;
        case "google":
          {
            const provider = new GoogleAuthProvider();
            const response = await signInWithPopup(auth, provider);

            await createUserDocs(response.user);

            navigate("/", { replace: true });
          }
          break;
        default:
          console.log("NYI");
          break;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <p className="snText"></p>

      <div className="snLinks">
        <FaGoogle onClick={() => handleSocialNetwork("google")} />
        <FaFacebook onClick={() => handleSocialNetwork("facebook")} />
      </div>
    </>
  );
};

export default SocialNetworkLogin;
