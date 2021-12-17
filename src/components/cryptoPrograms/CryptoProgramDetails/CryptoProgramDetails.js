import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import AxiosBackend from "../../../../src/utils/axios/AxiosBackend";
import { CryptoProgramContext } from "../../../context/CryptoProgramContext";

import "./CryptoProgramDetails.css";

export default function CryptoProgramDetails() {
  const [Loading, setLoading] = useState(true);
  const [CryptoProgram, setCryptoProgram] = useState({});
  const {
    dispatch,
    state: {
      cryptoProgram: { siteCryptoProgramsArray },
    },
  } = useContext(CryptoProgramContext);

  console.log("siteCryptoProgramsArray:" + siteCryptoProgramsArray);

  const { id } = useParams();
  console.log(id);

  async function getMyProg() {
    let foundCryptoProgram = await AxiosBackend.get(
      `/api/crypto-programs/${id}`
    );

    //   siteCryptoProgramsArray.find((item) => {
    //     return item._id === id ? item : null;
    //   });
    console.log(foundCryptoProgram);
    setCryptoProgram(foundCryptoProgram.data.payload);
    setLoading(false);
  }
  //   async function loadProgram(program_ID) {
  //     let;
  //   }
  console.log(CryptoProgram);
  useEffect(() => {
    getMyProg();
  }, []);

  return (
    <>
      <div className="CryptoProgramDetails">
        <h1 className="CryptoProgramDetails-h1">Crypto Program Details</h1>
        <hr />
        <div>
          {Loading ? (
            <div>Loading ... The... Program...</div>
          ) : (
            CryptoProgram && (
              <>
                <div className="CryptoProgramDetails-card-main">
                  <a
                    href={CryptoProgram.urlSiteRef}
                    className="CryptoProgramDetails-urlSiteRef"
                  >
                    <div className="CryptoProgramDetails-card-inner">
                      <div className="CryptoProgramDetails-card-section-metadata">
                        <div className="CryptoProgramDetails-access">
                          <span>Access Points: </span>
                          <br />
                          {CryptoProgram.access.map((access) => {
                            return <span>{access}</span>;
                          })}
                        </div>
                        <br />
                        <div className="CryptoProgramDetails-createdAt">
                          <span>Created: </span>
                          <br />
                          {new Date(CryptoProgram.createdAt).toDateString()}
                        </div>

                        <br />
                        {CryptoProgram.developer && (
                          <div className="CryptoProgramDetails-developer">
                            <span>Developer: </span>
                            <br />
                            {CryptoProgram.developer}
                          </div>
                        )}
                        <br />
                        <div className="CryptoProgramDetails-type">
                          <span>Type: </span>
                          <br />
                          {CryptoProgram.type}
                        </div>
                        <br />
                        <div className="CryptoProgramDetails-updatedAt">
                          <span>Updated: </span>
                          <br />
                          {new Date(CryptoProgram.updatedAt).toDateString()}
                        </div>
                        <br />
                      </div>
                      <div className="CryptoProgramDetails-card-section-descriptor">
                        {" "}
                        <div className="CryptoProgramDetails-name">
                          {CryptoProgram.name}
                        </div>
                        <div className="CryptoProgramDetails-cryptosAffiliated">
                          {CryptoProgram.cryptosAffiliated.length}
                        </div>
                        <div className="CryptoProgramDetails-urlLogo">
                          <img
                            src={CryptoProgram.urlLogo}
                            alt={CryptoProgram.url}
                          />
                        </div>
                        <div className="CryptoProgramDetails-url">
                          {CryptoProgram.url}
                        </div>
                        <div className="CryptoProgramDetails-description">
                          {CryptoProgram.description}
                        </div>
                        <div className="CryptoProgramDetails-container-favor">
                          <div className="CryptoProgramDetails-usersFavored">
                            {CryptoProgram.usersFavored.length}
                          </div>
                        </div>
                        <div className="CryptoProgramDetails-usersUnfavored">
                          {CryptoProgram.usersUnfavored.length}
                        </div>
                      </div>

                      <div className="CryptoProgramDetails-card-section-earning">
                        <div className="CryptoProgramDetails-offerWalls">
                          {CryptoProgram.earnOpportunities.offerWalls}
                        </div>
                        <div className="CryptoProgramDetails-promotions">
                          {CryptoProgram.earnOpportunities.promotions}
                        </div>
                        <div className="CryptoProgramDetails-rewardBonus">
                          {CryptoProgram.earnOpportunities.rewardBonus}
                        </div>
                        <div className="CryptoProgramDetails-rewardDaily">
                          {CryptoProgram.earnOpportunities.rewardDaily}
                        </div>
                        <div className="CryptoProgramDetails-rewardHourly">
                          {CryptoProgram.earnOpportunities.rewardHourly}
                        </div>
                      </div>
                      <div className="CryptoProgramDetails-card-section-withdrawal">
                        <div className="CryptoProgramDetails-withdrawalFrequency">
                          {CryptoProgram.withdrawalFrequency}
                        </div>
                        <div className="CryptoProgramDetails-withdrawalMinAmount">
                          {CryptoProgram.withdrawalMinAmount}
                        </div>
                        <div className="CryptoProgramDetails-withdrawalOptions">
                          {CryptoProgram.withdrawalOptions}
                        </div>
                        <div className="CryptoProgramDetails-withdrawalMinAmount">
                          {CryptoProgram.withdrawalMinAmount}
                        </div>
                        <div className="CryptoProgramDetails-withdrawalWallets">
                          {CryptoProgram.withdrawalWallets}
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </>
  );
}
