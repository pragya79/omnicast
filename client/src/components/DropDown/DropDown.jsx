import React from "react";
import { motion } from "framer-motion";
import "./dropDown.css";

export const DropDown = ({ fullName, avatar, description, role, onLogout, closeDropDown }) => {
  return (
    <motion.div 
      className="dropdown-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.img 
        src={avatar || "./avatar.png"} 
        alt="User Avatar" 
        className="user-avatar"
        whileHover={{ scale: 1.1 }}
      />
      <motion.h2 whileHover={{ scale: 1.1, color: "#5ed1ff" }} transition={{ duration: 0.3 }}>
        {fullName}
      </motion.h2>
      <p>{description}</p>
      <h4>Role: {role}</h4>

      <div className="dropdown-buttons">
        <motion.button 
          className="close-button"
          onClick={closeDropDown}
          whileHover={{ scale: 1.1, backgroundColor: "#ff4d4d", color: "#fff" }}
          whileTap={{ scale: 0.9 }}
        >
          Close
        </motion.button>
        
        <motion.button 
          className="logout-button"
          onClick={onLogout}
          whileHover={{ scale: 1.1, backgroundColor: "#2aaeff", color: "#fff" }}
          whileTap={{ scale: 0.9 }}
        >
          Logout
        </motion.button>
      </div>
    </motion.div>
  );
};
