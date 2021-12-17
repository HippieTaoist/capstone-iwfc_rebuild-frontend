import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CryptoProgramContext } from "../../context/CryptoProgramContext";
import AxiosBackend from "../../utils/axios/AxiosBackend";

export default function SitePrograms() {
  const {
    dispatch,
    state: { siteCryptoProgramsArray },
  } = useContext(CryptoProgramContext);

  const [PayloadArray, setPayloadArray] = useState([]);
  const [Loading, setLoading] = useState(true);

  async function handleGetPrograms() {
    try {
      let payloadArray = await AxiosBackend.get("/api/crypto-programs");

      setPayloadArray(payloadArray.data.payload);
      setLoading(false);

      dispatch({
        type: "SiteCryptoProgramSet",
        siteCryptoProgramsArray: payloadArray,
      });
    } catch (error) {}
  }

  return (
    <div className="SitePrograms">
      <h1>Crypto Programs</h1>
      <button
        type="button"
        className="SitePrograms-button"
        onClick={handleGetPrograms}
      >
        Get Programs
      </button>
      <hr />
      {Loading ? (
        <div>Loading Site Programs</div>
      ) : (
        PayloadArray.map((program) => {
          console.log(program);
          return (
            <div className="SitePrograms-logo-div">
              <Link to={`/crypto-program-details/${program._id}`}>
                <img src={program.urlLogo} alt={program.name} />
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
}
