import React from "react";

export default function EditUser() {
  const {
    state: { user },
  } = useContext(AuthContext);

  const {
    dispatch,
    state: {
      crypto: { siteCrypto },
    },
  } = useContext(CryptoContext);

  async function loader() {
    try {
      let crypto = await AxiosBackend.get("/api/cryptos/");
      console.log(crypto);
      let dispatchedPriceArray = crypto.data.payload;
      console.log(dispatchedPriceArray);

      dispatch({
        type: "SiteCryptoSet",
        siteCrypto: dispatchedPriceArray,
      });
      console.log(siteCrypto);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUnfavorOnClick(unLikedId) {
    console.log(unLikedId);
    let updatedCrypto = await AxiosBackend.put("/api/cryptos/crypto-update", {
      favored: false,
      _id: unLikedId,
    });
    console.log(updatedCrypto);
  }

  let tempArray = user.profile.favoringCryptos;

  let favoringCryptos = tempArray.map((crypto) => {
    for (const cryptoKey in siteCrypto) {
      // console.log(siteCrypto[cryptoKey]._id);
      if (siteCrypto[cryptoKey]._id === crypto) {
        // console.log("it matches", siteCrypto[cryptoKey]);
        return siteCrypto[cryptoKey];
      }
    }
  });

  console.log(favoringCryptos);
  useEffect(() => {
    loader();
  }, []);

  return (
    <>
      <div>
        <input
          type="text"
          className="EditUser-email"
          placeholder="Type your email address here"
        />
      </div>
      <div>
        <input
          type="text"
          className="EditUser-password"
          placeholder="Type your email address here"
        />
      </div>
    </>
  );
}
