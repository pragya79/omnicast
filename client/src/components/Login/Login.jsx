import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,signOut} from "../../config/firebase";
import './login.css';
import { DropDown } from "../DropDown/DropDown";



export const Login = () => {
  const [avatar, setAvatar] = useState({ file: null, url: "" });
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [description, setDescription] = useState("");
  const [userRole, setUserRole] = useState("Freelancer");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setIsLoggedIn(true);
      setUserData(storedUser);
    }
  }, []);

  const handleAvatar = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const avatarUrl = await uploadAvatarToCloudinary(file);
        setAvatar({ file, url: avatarUrl });
        toast.success("Avatar uploaded successfully")
      } catch (error) {
        toast.error("Failed to upload avatar.");
      }
    }
  };

  const uploadAvatarToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("onmnicast", "omnicast");
    formData.append("api_key", "696718139813671");
  
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/du7j4qpni/image/upload`, {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      console.log("Uploaded Avatar URL:", result); 
      return result.secure_url;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      throw error;
    }
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const user = userCredential.user;

      const response = await fetch(`http://localhost:5000/api/users/getUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firebaseId: user.uid }),
      });

      if (!response.ok) throw new Error("Failed to fetch user data.");
      const userData = await response.json();

      if (userData) {
        const userDetails = {
          fullName: userData.fullName,
          avatar: userData.avatar,
          description: userData.description,
          role: userData.role,
          firebaseId: user.uid,
        };

        localStorage.setItem("currentUser", JSON.stringify(userDetails));
        setUserData(userDetails);
        setIsLoggedIn(true);
        toast.success("Login successful!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!fullName || !registerEmail || !registerPassword) {
      toast.error("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      let avatarUrl = avatar.file ? await uploadAvatarToCloudinary(avatar.file) : "";
      console.log("Avatar URL before sending to API:", avatarUrl);

      const res = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      const user = res.user;

      const response = await fetch("http://localhost:5000/api/users/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseId: user.uid,
          email: registerEmail,
          fullName,
          avatar: avatarUrl,
          description: description || "Hey there!",
          role: userRole,
        }),
      });

      if (!response.ok) throw new Error("Error while saving user data.");
      toast.success("Registration successful! Please log in now.");
      setIsRegistering(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUser)); 
    }
  }, []);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("currentUser");
      setUserData({ fullName: "", avatar: "", description: "", role: "" }); 
      setIsLoggedIn(false);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Error logging out. Try again.");
    }
  };

  return isLoggedIn?
  <DropDown 
  fullName={userData.fullName || "User"} 
  avatar={userData.avatar || "./avatar.png"} 
  description={userData.description || "No description"} 
  role={userData.role || "Freelancer"} 
  onLogout={handleLogout} 
/>:(
    <div className="login-page">
      <div className="login-container">
        {isRegistering ? (
          <div className="register">
            <h2>Register</h2>
            <form className="form" onSubmit={handleRegister}>
              <div className="login-avatar-container">
                <label htmlFor="file">
                  <img src={avatar.url || "./avatar.png"} alt="avatar" className="login-avatar" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
              </div>
              <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              <input type="email" placeholder="Email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
              <input type="password" placeholder="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required />
              <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
              <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                <option value="Freelancer">Freelancer</option>
                <option value="Content Creator">Content Creator</option>
                <option value="Business Agency">Business Agency</option>
              </select>
              <button type="submit" className="btns" disabled={loading}>Register</button>
              <p>Already have an account? <strong onClick={() => setIsRegistering(false)}>Login</strong></p>
            </form>
          </div>
        ) : (
          <div className="login">
            <h2>Login</h2>
            <form className="form" onSubmit={handleLogin}>
              <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
              <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
              <button type="submit" className="btns" disabled={loading}>Login</button>
              <p>Don't have an account? <strong onClick={() => setIsRegistering(true)}>Register</strong></p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
