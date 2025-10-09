import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const { signupUser } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    const result = await signupUser(
      formData.username,
      formData.email,
      formData.password
    );
    console.log(result);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign Up</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          type="text"
          name="username"
          id="username"
          placeholder="Username"
        />
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
        <button className={styles.button}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
