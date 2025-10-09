import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import styles from "./Login.module.css";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    const result = await loginUser(formData.email, formData.password);
    console.log(result); //result.success = true

    if (result.success) {
      navigate("/");
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          type="text"
          name="email"
          id="email"
          placeholder="Email"
        />
        <input
          className={styles.input}
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <button className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Login;
