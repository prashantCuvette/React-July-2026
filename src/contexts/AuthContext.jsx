import { createContext, useContext, useEffect, useState } from "react";

const API_URL = "http://localhost:3000";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.log(error.message);
        localStorage.getItem("user");
      }
    }
    setLoading(false);
  }, []);

  // login user
  const loginUser = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_URL}/users?email=${email}&password=${password}`
      );

      const data = await response.json();

      if (data.length > 0) {
        const userData = data[0];
        setUser(userData);

        localStorage.setItem("user", JSON.stringify(userData));
        setLoading(false);
        return { success: true, user: userData };
      } else {
        setError("Invalid Email and Password");
        setLoading(false);
        return { success: false, message: "Login Failed" };
      }
    } catch (error) {
      console.log(error.message);
      setError("Error While Logging In");
      setLoading(false);
      return { success: false, message: "Login Failed. Try Again" };
    }
  };

  //signup
  const signupUser = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const existingUser = await fetch(`${API_URL}/users?email=${email}`);
      const data = await existingUser.json();

      if (data.length > 0) {
        setError("User With Email Exists");
        setLoading(false);
        return { success: false, message: "User With Email Exists" };
      }

      const newUser = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { name, email, password },
      });

      if (newUser.ok) {
        const data = await newUser.json();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setLoading(false);
        return { success: true, message: "User Created Successfully" };
      } else {
        throw new Error("Signup Failed. Please Try Later");
      }
    } catch (error) {
      console.log(error.message);
      setError("Error While Signup In");
      setLoading(false);
      return { success: false, message: "Signup Failed. Try Again" };
    }
  };

  //logout
  const logoutUser = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem("user");
  };

  //update user
  const updateUser = async (user) => {
    setLoading(true);
    setError(false);

    try {
      // first find user with the email
      // todo

      const updateUser = await fetch(`${API_URL}/users`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: { ...user },
      });

      const data = await updateUser.json();

      if (data.length > 0) {
        // update the user
        const getUser = data[0];
        //update user in local storage..

        return { success: false, message: "User Updation Successful" };
      } else {
        setError("User With Email Does Not Exists");
        setLoading(false);
        return { success: false, message: "User With Email Not Found" };
      }
    } catch (error) {
      setError("Error While Updating User");
      setLoading(false);
      return { success: false, message: "Signup Failed. Try Again" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        loginUser,
        signupUser,
        logoutUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
