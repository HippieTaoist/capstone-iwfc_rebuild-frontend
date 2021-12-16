import React from "react";
import AxiosBackend from "../../utils/axios/AxiosBackend";

export default function SitePrograms() {
  async function handleGetPrograms() {
    try {
      let payload = await AxiosBackend.get("/api/crypto-programs");

      console.log(payload);
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
    </div>
  );
}
