import axios from "axios";
import { useEffect, useState } from "react";

let useAxios = (url,method,data) => {
  let [response, setResponse] = useState(null);
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(true);

  let fetchData = async () => {
    try {
      let res = await axios({ url, method, data: data ? data : "" });
      setResponse(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [url,method,data]); // config *******************************************

  return { response, error, loading };
};

export default useAxios;
