import React from "react";
import { styled } from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import useInput from "../hooks/useInput";
import { auth } from "../service/firebase";
import Button from "./Button";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import github from "../img/github.png";
import google from "../img/google.png";

const Nav = styled.li`
  height: 20px;
  margin-left: 30px;
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

const LoginForm = styled.form`
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
  margin-top: 20px;
  border: none;
  background-color: #f5f5f5;
  outline: none;
`;

const PasswordInput = styled(EmailInput)``;

function SignIn() {
  const [open, setOpen] = useState(false);
  const [email, emailHandler] = useInput("");
  const [password, passwordHandler] = useInput("");
  const [login, setLogin] = useState("로그인");
  const [userData, setUserData] = useState(null);

  // 로그인 유저 확인

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log("user", user);
      return !auth.currentUser ? setLogin("로그인") : setLogin("로그아웃");
    });
  }, [auth]);

  // 로그인 모달 오픈
  const openLoginModalHandler = () => {
    setOpen(!open);
    emailHandler({ target: { value: "" } });
    passwordHandler({ target: { value: "" } });
  };

  // 이메일 로그인
  const signInWithEmail = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user with signIn", userCredential.user);
      setOpen(!open);
    } catch (error) {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // console.log("error with signIn", errorCode, errorMessage);
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  // 구글 로그인
  function signInWithGoogle(e) {
    e.preventDefault();
    const provider = new GoogleAuthProvider(); // provider 구글 설정
    signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
      .then((data) => {
        setUserData(data.user); // user data 설정
        // console.log("google", data); // console에 UserCredentialImpl 출력
        setOpen(false);
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  function signInWithGithub(e) {
    e.preventDefault();
    const provider = new GithubAuthProvider(); // provider 깃허브 설정
    signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
      .then((data) => {
        setUserData(data.user); // user data 설정
        // console.log(data); // console에 UserCredentialImpl 출력
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 로그아웃

  const logOut = async (event) => {
    event.preventDefault();
    await signOut(auth);
  };

  return (
    <>
      <Nav onClick={login === "로그인" ? openLoginModalHandler : logOut}>
        {login}
      </Nav>
      <ModalDiv open={open} onClick={openLoginModalHandler}>
        <FormContainer onClick={(e) => e.stopPropagation()}>
          <LoginForm>
            <InputTitle>Sign In</InputTitle>{" "}
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
            <Button onClick={signInWithEmail} type="loginBtn">
              로그인
            </Button>
            <Button onClick={signInWithGoogle} type="googleBtn">
              <img
                src={google}
                alt="구글로고"
                style={{ width: "20px", float: "left" }}
              />
              구글 계정으로 로그인
            </Button>
            <Button onClick={signInWithGithub} type="gihubBtn">
              <img
                src={github}
                alt="깃허브로고"
                style={{ width: "20px", float: "left" }}
              />
              깃허브 계정으로 로그인
            </Button>
          </LoginForm>
          <Button onClick={openLoginModalHandler} type={"close"}>
            x
          </Button>
        </FormContainer>
      </ModalDiv>
    </>
  );
}

export default SignIn;
