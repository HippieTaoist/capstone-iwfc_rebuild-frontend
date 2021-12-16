import React, { useState } from "react";
import { Link } from "react-router-dom";
import AxiosBackend from "../../utils/axios/AxiosBackend";

export default function SitePrograms() {
  const [PayloadArray, setPayloadArray] = useState([]);
  const [Loading, setLoading] = useState(true);
  async function handleGetPrograms() {
    try {
      let payloadArray = await AxiosBackend.get("/api/crypto-programs");

      setPayloadArray(payloadArray.data.payload);
      setLoading(false);
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
