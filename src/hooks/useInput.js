import { useState } from "react";

const useInput = () => {
  //state : value 는 useState 로 관리
  const [value, setValue] = useState("");

  // handler
  const handler = (e) => {
    setValue(e.target.value);
  };
  // 이 훅은 배열을 반환하고 첫번째는 value, 두번째는 handler 를 반환
  return [value, handler];
};

export default useInput;
