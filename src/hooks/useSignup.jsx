import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (
    fname,
    lname,
    phone,
    bname,
    email,
    city,
    province,
    passwrod,
    confirm
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      // credentials: "include",
      body: JSON.stringify({
        fname,
        lname,
        bname,
        phone,
        email,
        city,
        province,
        passwrod,
        confirm,
      }),
    });

    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      console.log("Error from response : ", json);
    }

    console.log(response.ok);

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      return json.email;
    }
  };

  return { signup, isLoading, error };
};
