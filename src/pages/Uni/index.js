import React, { useEffect, useState } from "react";
import CountryForm from "../../components/Forms/CountryFrom";
import axios from "axios";

const Uni = () => {
  const [countryName, setCountryName] = useState("");
  const [provinceState, setProvinceState] = useState("");
  const [unis, setUnis] = useState(null);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (countryName, provinceState) => {
    try {
      setLoading(true);
      let params = {};
      let url = "http://localhost:5000/api/v1/uni/getByCountry";
      //   if (countryName != "") {
      //     url = url + "/" + countryName;
      //   }
      //   if (provinceState != "") {
      //     url = url + "/" + provinceState;
      //   }
      if (countryName) {
        params = {
          ...params,
          country: countryName,
        };
      }
      if (provinceState) {
        params = {
          ...params,
          provinceState,
        };
      }

      const result = await axios.get(url, {
        params: params,
      });
      setUnis(result.data.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div>
        <CountryForm
          setCountryName={setCountryName}
          countryName={countryName}
          provinceState={provinceState}
          setProvinceState={setProvinceState}
          onSubmit={onSubmit}
        />
      </div>
      <div>
        {unis?.length == 0 && <p>No data found in the db</p>}
        {unis?.length > 0 &&
          unis.map((uni, key) => {
            return (
              <div key={key}>
                <p>{uni.name}</p>
                <p>{uni.domains}</p>
                <p>{uni.web_pages}</p>
                <p>{uni.alpha_two_code}</p>
                <p>{uni.state_province}</p>
                <p>{uni.country}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Uni;
