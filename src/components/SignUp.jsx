import React from "react";
import { styled } from "styled-components";
import useInput from "../hooks/useInput";
import { useEffect } from "react";
import { useState } from "react";
import { auth } from "../service/firebase";
import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Nav = styled.li`
  margin-left: 30px;
  height: 20px;
  cursor: pointer;
`;

const ModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 30;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.open ? "block" : "none")};
`;

const FormContainer = styled.div`
  width: 550px;
  height: 400px;
  z-index: 9999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
`;

const SignUpForm = styled.form`
  text-align: center;
`;

const InputTitle = styled.h2`
  font-size: 25px;
  color: #657af0;
  font-weight: bold;
`;

const EmailInput = styled.input`
  width: 300px;
  height: 30px;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  border: none;
  background-color: #f5f5f5;
  margin-bottom: 10px;
`;

const PasswordInput = styled(EmailInput)``;

const CheckPasswordInput = styled(EmailInput)``;

function SignUp() {
  const [open, setOpen] = useState("");
  const [join, setJoin] = useState("회원가입");
  const [email, emailHandler] = useInput();
  const [password, passwordHandler] = useInput();
  const [checkPassword, checkPasswordHandler] = useInput();

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      return !auth.currentUser ? setJoin("회원가입") : setJoin("마이페이지");
    });
  }, [auth]);

  // 회원가입 모달 오픈
  const openSignUpModalHandler = () => {
    setOpen(!open);
    emailHandler({ target: { value: "" } });
    passwordHandler({ target: { value: "" } });
    checkPasswordHandler({ target: { value: "" } });
  };

  // 회원가입
  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Nav
        onClick={
          join === "회원가입"
            ? openSignUpModalHandler
            : () => {
                navigate(`/mypage/${auth.currentUser.uid}`);
              }
        }
      >
        {join}
      </Nav>
      <ModalDiv open={open} onClick={openSignUpModalHandler}>
        <FormContainer onClick={(e) => e.stopPropagation()}>
          <SignUpForm>
            <InputTitle>Sign Up</InputTitle>{" "}
            <EmailInput
              type="text"
              value={email}
              placeholder="이메일을 입력해주세요."
              onChange={emailHandler}
            />
            <PasswordInput
              type="password"
              value={password}
              placeholder="비밀번호를 입력해주세요."
              onChange={passwordHandler}
            />
            <CheckPasswordInput
              type="password"
              value={checkPassword}
              placeholder="비밀번호를 다시 입력해주세요."
              onChange={checkPasswordHandler}
            />
            <button onClick={signUpHandler}>회원가입</button>
          </SignUpForm>
        </FormContainer>
      </ModalDiv>
    </>
  );
}

export default SignUp;
