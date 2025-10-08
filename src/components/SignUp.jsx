import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

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
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          type="text"
          name="username"
          id="username"
        />
        <input
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          type="text"
          name="email"
          id="email"
        />
        <input
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          type="password"
          name="password"
          id="password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
