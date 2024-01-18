import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Backgroundimage from "../components/Backgroundimage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [showPassword, setshowPassword] = useState(false);
  const [formvalues, setFormValues] = useState({
    email: " ",
    password: "",
  });

  // data is not recieved by firebase i don't know why.we have to figure it out.
  const navigate = useNavigate(true);

  const handleSignIn = async () => {
    try {
      const { email, password } = formvalues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser)
        navigate("/")
  })
// problem is between line 16 to 32.
  return (
    <Container showPassword={showPassword}>
      <Backgroundimage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more</h1>
            <h4>Watch anywhere. Cancel anytime</h4>
            <h6>
              Ready to Watch? Enter your email to create or restart your
              membership
            </h6>
          </div>
          <div className="form">
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
            {showPassword && (
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
            )}
            {!showPassword && (
              <button onClick={() => setshowPassword(true)}>
                Get started!
              </button>
            )}
          </div>
          <button onClick={handleSignIn} onChange={{}}>Sign Up</button>
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
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-allign: center;
        font-size: 1.8rem;
        h1 {
          padding: 0 25rem;
        }
        /* have to work on these two codes below */
        h4 {
          padding: 0 25rem;
        }
        h6 {
          padding: 0 25rem;
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
        }
      }
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
`;

// text-allign only works on block elements not on inline and inline-blocks
// allignment of text is remaining of heading
// and data is not recieved by firebase. emails are not getting recieved on firebase.