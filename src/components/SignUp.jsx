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
  fetchSignInMethodsForEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Button from "./Button";

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
`;

const SignUpForm = styled.form`
  text-align: center;
`;

const InputTitle = styled.h2`
  margin-top: 10px;
  font-size: 25px;
  color: #3e3e3e;
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
  outline: none;
`;

const CheckId = styled.button`
  background-color: transparent;
  border-radius: 6px;
  font-size: 13px;
  width: 60px;
  height: 30px;
  border: none;
  color: #343434;
  cursor: pointer;
  position: absolute;
  right: 40px;
  margin-top: 20px;
  &:hover {
    color: #000000;
    background-color: #d9d8d8;
  }
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
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      checkPassword.trim() === ""
    ) {
      alert("양식을 전부 입력해주세요.");
      return;
    }
    if (password !== checkPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (password.length < 8) {
      alert("비밀번호는 최소 8자리 이상입니다.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      setOpen(!open);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyEmailHandler = async (event) => {
    event.preventDefault();
    if (email.trim() === "") {
      alert("이메일을 입력해 주세요.");
      return;
    }
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        // 이미 존재하는 이메일
        alert("이미 존재하는 이메일입니다.");
      } else {
        // 사용 가능한 이메일
        alert("사용할 수 있는 이메일입니다.");
      }
    } catch (error) {
      alert("이메일 확인에 실패했습니다.");
      console.log("이메일 확인 실패", error.code, error.message);
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
              placeholder="아이디 (이메일 주소)"
              onChange={emailHandler}
            />
            <CheckId onClick={verifyEmailHandler}>중복확인</CheckId>
            <PasswordInput
              type="password"
              value={password}
              placeholder="비밀번호"
              onChange={passwordHandler}
            />
            <CheckPasswordInput
              type="password"
              value={checkPassword}
              placeholder="비밀번호 확인"
              onChange={checkPasswordHandler}
            />
            <Button onClick={signUpHandler} type="loginBtn">
              회원가입
            </Button>
          </SignUpForm>
          <Button onClick={openSignUpModalHandler} type={"close"}>
            x
          </Button>
        </FormContainer>
      </ModalDiv>
    </>
  );
}

export default SignUp;
