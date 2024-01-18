import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Backgroundimage from "../components/Backgroundimage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setshowPassword] = useState(false);
  const [formvalues, setFormValues] = useState({
    email: " ",
    password: "",
  });

  // data is not recieved by firebase i don't know why.we have to figure it out.
  const navigate = useNavigate(true);

  const handleLogIn = async () => {
    try {
      const { email, password } = formvalues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });
// problem is between line 16 to 32.
  return ( 
    <Container>
      <Backgroundimage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formvalues.email}
                onChange={(e) =>
                  setFormValues({
                    ...formvalues,
                    [e.target.name]: e.target.value,
                  })
                }
              />

                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  value={formvalues.password}
                  onChange={(e) =>
                    setFormValues({
                      ...formvalues,
                      [e.target.name]: e.target.value,
                    })
                  }
                />

              {!showPassword && (
                <button onClick={handleLogIn}>
                  Login !!
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
  }
  .form-container {
    gap: 2rem;
    height: 85vh;
    .form {
      padding: 2 rem;
      background-color: #000000b0;
      width: 25vw;
      gap: 2rem;
      color: white;
      .container {
        gap: 2rem;
        input {
          padding: 0.5rem 1rem;
          width: 15rem;
        }
        button {
          padding: 0.5rem 1rem;
          border: none;
          cursor: pointer;
          color: white;
          background-color: #e50914;
          border-radius: 0.2rem;
          font-weight: bolder;
          font-size: 1.05rem;
        }
      }
    }
  }
`;

// text-allign only works on block elements not on inline and inline-blocks
// this mf button is not working in center it's not redirecting.to the page where it's needed to redirect.