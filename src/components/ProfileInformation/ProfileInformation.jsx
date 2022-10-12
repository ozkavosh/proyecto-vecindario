import { updateProfile } from "firebase/auth";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useReducer } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAuthContext } from "../../context/authContext";
import { auth, db } from "../../firebase/config";
import "./ProfileInformation.css";

const ProfileInformation = () => {
  const { currentUser, setCurrentUser } = useAuthContext();
  const [inputData, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "setInput":
          return {
            ...state,
            ...action.payload,
          };
        default:
          return state;
      }
    },
    { displayName: "", province: "", location: "", phone: "", dni: "" }
  );

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", currentUser.uid), (document) => {
      const { displayName, province, location, phone, dni } = document.data();
      dispatch({
        type: "setInput",
        payload: {
          displayName,
          province: province || "",
          location: location || "",
          phone: phone || "",
          dni: dni || "",
        },
      });
    });

    return () => unsub();
  }, [currentUser?.uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await updateDoc(doc(db, "users", currentUser.uid), { ...inputData });
      await updateProfile(auth.currentUser , { displayName: inputData.displayName });
      setCurrentUser(prev => ({ ...prev, displayName: inputData.displayName}));
    }catch (e){
      console.log(e);
    }
  };

  const handleChange = (e) => {
    dispatch({
      type: "setInput",
      payload: { [e.target.getAttribute("name")]: e.target.value },
    });
  };

  return (
    <section className="profile-info">
      <h1>
        <FaUserCircle /> Información Personal
      </h1>
      <hr />
      <section className="form">
        <form>
          <div className="input">
            <label htmlFor="name">Nombre</label>
            <input
              className="editable"
              name="displayName"
              onChange={handleChange}
              type="text"
              defaultValue={inputData.displayName}
            />
          </div>
          <div className="input">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              defaultValue={currentUser.email}
              disabled
              readOnly
            />
          </div>
          <div className="input">
            <label htmlFor="pass">Contraseña</label>
            <input
              name="pass"
              type="password"
              defaultValue="abc12345678"
              disabled
              readOnly
            />
          </div>
          <div className="input-grid">
            <div className="input">
              <label htmlFor="province">Provincia</label>
              <input
                name="province"
                onChange={handleChange}
                className="editable"
                type="text"
                defaultValue={inputData.province}
              />
            </div>
            <div className="input">
              <label htmlFor="location">Localidad</label>
              <input
                name="location"
                onChange={handleChange}
                className="editable"
                type="text"
                defaultValue={inputData.location}
              />
            </div>
            <div className="input">
              <label htmlFor="phone">Teléfono</label>
              <input
                name="phone"
                onChange={handleChange}
                className="editable"
                type="text"
                defaultValue={inputData.phone}
              />
            </div>
            <div className="input">
              <label htmlFor="dni">DNI</label>
              <input
                name="dni"
                onChange={handleChange}
                className="editable"
                type="text"
                defaultValue={inputData.dni}
              />
            </div>
          </div>
          <input
            disabled={!inputData.displayName}
            className="submitButton"
            type="submit"
            onClick={handleSubmit}
            value="Guardar Cambios"
          />
        </form>
      </section>
    </section>
  );
};

export default ProfileInformation;
