import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./starter.css";
import Circle from "../Circle/Circle";

const Starter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const text = document.getElementById("text");
      const bg = document.querySelector(".background");

      if (text && bg) {
        let value = window.scrollY;
        text.style.transform = `translateY(${value * 2}px)`;
        bg.style.transform = `scale(${1 + value * 0.001})`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <section className="parallax">
        <div className="background"></div>
        <Circle/>
        <div className="cube">
          <div className="face front"></div>
          <div className="face back"></div>
          <div className="face left"></div>
          <div className="face right"></div>
          <div className="face top"></div>
          <div className="face bottom"></div>
        </div>
        <h2 id="text">OmniCast</h2>
      </section>

      <section className="sec">
        <h2>One Broadcast, Infinite Reach!</h2>
        <p>
          OmniCast is your all-in-one broadcasting platform, designed to connect you with audiences
          across the world in real-time. Whether you're an educator, content creator, or business
          professional, we empower you to deliver seamless and engaging broadcasts.
        </p>

        <h3 id="why-omnicast">Why OmniCast?</h3>
        <p>
          **Live Streaming Made Easy** – Reach your audience with high-quality live sessions. <br />
          **Global Connectivity** – Broadcast to multiple platforms simultaneously. <br />
          **AI-Powered Insights** – Track audience engagement and optimize your reach. <br />
          **No Limits** – Stream anytime, anywhere, without restrictions.
        </p>
        <p>
          Ready to explore the future of digital broadcasting? **Scroll down** to start your journey!
        </p>
        <button id="login-btn" onClick={() => navigate("/login")}>
          Get Started
        </button>
      </section>
    </div>
  );
};

export default Starter;
