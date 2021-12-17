import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SiteTools from "../../../utils/siteTools/SiteTools";

import AxiosBackend from "../../../utils/axios/AxiosBackend";
import { CryptoContext } from "../../../context/CryptoContext";

import "./CryptoDetails.css";

export default function CryptoDetails() {
  const {
    dispatch,
    state: {
      crypto: { siteCrypto },
    },
  } = useContext(CryptoContext);

  const crypto = useParams();
  const _id = crypto.id;
  console.log(_id);

  let foundCrypto = siteCrypto.find((item) => {
    return item._id === _id ? item : null;
  });

  console.log(foundCrypto);

  // siteCrypto.map((item) => {
  //     item._id === _id ? item : null;
  //   });

  // console.log(item.urls);
  // console.log(item._id);
  // console.log(item.name);
  // console.log(item.symbol);
  // console.log(item.priceCurrent);
  // console.log(item.programsAffiliated);
  // console.log(item.cmcId);
  // console.log(item.updatedAt);
  // console.log(item.usersFavored);
  // console.log(item.usersUnfavored);
  // console.log(item.logo);

  //   useEffect(() => {
  //     loader();
  //   }, []);

  return (
    <div className="CryptoDetails-container-main">
      <div className="CryptoDetails-crypto-details-container">
        <div className="CryptoDetails-left-container">
          <h1>
            <span className="CryptoDetails-category">
              {foundCrypto.category}
            </span>{" "}
          </h1>
          <div className="CryptoDetails-logo">
            {<img src={foundCrypto.logo} />}
          </div>
          <div className="CryptoDetails-symbol">
            <h3>{foundCrypto.symbol}</h3>
          </div>
          <div className="CryptoDetails-priceCurrent">
            <h3>
              $
              {foundCrypto.priceCurrent > 1
                ? (Math.round(foundCrypto.priceCurrent * 100) / 100).toFixed(2)
                : foundCrypto.priceCurrent}
            </h3>
          </div>
        </div>
        <div className="CryptoDetails-right-container">
          <div className="CryptoDetails-description">
            <p>{foundCrypto.description}</p>
          </div>
          <div className="CryptoDetails-container-favored">
            <div className="CryptoDetails-usersFavored">
              hoders: {foundCrypto.usersFavored.length}
            </div>
            <div className="CryptoDetails-usersUnfavored">
              fodlers: {foundCrypto.usersUnfavored.length}
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="CryptoDetails-container-research-reachout">
        <h2>More Research / Reach-Out Locations:</h2>
        <div className="CryptoDetails-container-research">
          <div className="CryptoDetails-research-l">
            <div className="CryptoDetails-container-websites">
              {" "}
              Website(s):{" "}
              {foundCrypto.urls.website.map((item) => {
                return (
                  <div className="CryptoDetails-website">
                    <a href={item} className="CryptoDetails-container-links">
                      {item}
                    </a>
                    <br />
                  </div>
                );
              })}
            </div>
            <br />
            <div className="CryptoDetails-explorer">
              {" "}
              Explorer(s):{" "}
              {foundCrypto.urls.explorer.map((item) => {
                return (
                  <div className="CryptoDetails-explorer">
                    <a href={item} className="CryptoDetails-container-links">
                      {item}
                    </a>
                    <br />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="CryptoDetails-research-r">
            <div className="CryptoDetails-doc">
              {" "}
              Docs:
              <br />
              <div className="CryptoDetails-source-code">
                Source Code:{" "}
                {foundCrypto.urls.source_code.map((item) => {
                  return (
                    <div className="CryptoDetails-source_code">
                      <a href={item} className="CryptoDetails-container-links">
                        {item}
                      </a>
                    </div>
                  );
                })}
              </div>
              <br />
              <div className="CryptoDetails-technical-doc">
                Technical Documents:{" "}
                {foundCrypto.urls.technical_doc.map((item) => {
                  return (
                    <div className="CryptoDetails-technical_doc">
                      <a href={item} className="CryptoDetails-container-links">
                        {item}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <br />
        <hr />
        <br />
        <div className="CryptoDetails-social">
          <div className="CryptoDetails-social-media">
            {" "}
            Social Media:
            <br />{" "}
            {foundCrypto.urls.facebook.length > 0 && (
              <div className="CryptoDetails-facebook">
                Facebook:{" "}
                {foundCrypto.urls.facebook.map((item) => {
                  return (
                    <div className="CryptoDetails-facebook">
                      <a href={item} className="CryptoDetails-container-links">
                        {item}
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
            {foundCrypto.urls.twitter.length > 0 && (
              <div className="CryptoDetails-twitter">
                Twitter: {foundCrypto.urls.twitter_username}
                <br />
                {foundCrypto.urls.twitter.map((item) => {
                  return (
                    <div className="CryptoDetails-twitter_username">
                      <a href={item} className="CryptoDetails-container-links">
                        {item}
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
            {foundCrypto.urls.reddit.length > 0 && (
              <div className="CryptoDetails-reddit">
                reddit:{" "}
                {foundCrypto.urls.reddit.map((item) => {
                  return (
                    <div className="CryptoDetails-reddit">
                      <a href={item} className="CryptoDetails-container-links">
                        {item}
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {foundCrypto.urls.message_board.length > 0 && (
            <div className="CryptoDetails-message-boards">
              {" "}
              Message Boards:{" "}
              {foundCrypto.urls.message_board.map((item) => {
                return (
                  <div className="CryptoDetails-message_board">
                    <a href={item} className="CryptoDetails-container-links">
                      {item}
                    </a>
                  </div>
                );
              })}
            </div>
          )}
          {foundCrypto.urls.chat.length > 0 && (
            <div className="CryptoDetails-chat">
              {" "}
              Chat:{" "}
              {foundCrypto.urls.chat.map((item) => {
                return (
                  <div className="CryptoDetails-chat">
                    <a href={item} className="CryptoDetails-container-links">
                      {item}
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
