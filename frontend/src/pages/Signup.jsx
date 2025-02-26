import React, { useState } from "react";
import "../styles/Signup.css";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is user
  const [city, setCity] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    // Create user data object
    const userData = {
      fullName,
      email,
      password: String(password),
      role,
      city: role === "admin" ? city : null, // ✅ Changed from "" to null for database consistency
    };

    console.log("🔍 Sending data:", userData); // Debugging log

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("✅ Response:", data);

      if (response.ok) {
        alert("Signup successful!");
      } else {
        alert(`Error: ${data.message || "Signup failed"}`);
      }
    } catch (error) {
      console.error("❌ Signup failed:", error);
      alert("Signup failed. Check console for details.");
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Role Selection */}
        <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* City Selection (Only for Admins) */}
        {role === "admin" && (
          <input
            type="text"
            name="city"
            placeholder="City of Service"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        )}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
