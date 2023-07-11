import React from "react";
import useInput from "../hooks/useInput";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useQuery } from "react-query";

import uuid from "react-uuid";
import { auth } from "../service/firebase";

import { useMutation, useQueryClient } from "react-query";
import {
  getComments,
  addComment,
  deleteComment,
  updateComment,
} from "../api/comments";
import Button from "./Button";

const CommentsContainer = styled.div`
  width: 800px;
  padding: 20px;
  margin: 70px auto 0px auto;
  border: 1px solid white;
`;

const NicknameInput = styled.input`
  background: transparent;
  border: 1px solid white;
  width: 200px;
  height: 30px;
  padding: 5px;
  color: white;
`;
const CommentInput = styled.input`
  background: transparent;
  border: 1px solid white;
  margin-left: 20px;
  width: 500px;
  height: 30px;
  padding: 5px;
  color: white;
`;

const CommentContainer = styled.div`
  margin-top: 10px;
`;

const CommentNickname = styled.h3`
  width: 200px;
  height: 20px;
  text-align: center;
  font-size: 17px;
  font-weight: bold;
  display: inline-block;
`;

const CommentContent = styled.p`
  font-size: 17px;
  margin-left: 20px;
  width: 500px;
  height: 20px;
  text-align: center;
  display: inline-block;
`;

const DeleteBtn = styled.button``;

function Comments() {
  const [nickName, nickNameHandler] = useInput();
  const [comment, commentHandler] = useInput();

  const { isLoading, isError, data } = useQuery("comments", getComments);

  const params = useParams();
  const { id } = params;

  // 리액트 쿼리 관련 코드
  const queryClient = useQueryClient();
  const mutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
      console.log("성공하였습니다.");
    },
  });

  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
      console.log("삭제되었습니다.");
    },
  });

  const addCommentHandler = async (e) => {
    e.preventDefault();
    // 사진 제외한 모든 항목 입력 필터
    if (nickName && comment) {
      const newComment = {
        id: uuid(),
        nickName,
        comment,
        cocktailId: id,
        userId: auth.currentUser.uid,
      };

      mutation.mutate(newComment);

      // 폼 초기화
      nickNameHandler({ target: { value: "" } });
      commentHandler({ target: { value: "" } });
    } else {
      alert("모든 항목을 입력해주세요.");
    }
  };

  const deleteCommentHandler = (id) => {
    const confirmed = window.confirm("이 댓글을 삭제하시겠습니까?");
    if (confirmed) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <CommentsContainer>
      <NicknameInput
        type="text"
        value={nickName}
        onChange={nickNameHandler}
        placeholder="닉네임을 입력하세요."
      />
      <CommentInput
        type="text"
        value={comment}
        onChange={commentHandler}
        placeholder="내용을 입력하세요."
      />
      <button onClick={addCommentHandler}>등록</button>
      {data
        ?.filter((comment) => comment.cocktailId == params.id)
        .map((comment) => {
          return (
            <CommentContainer>
              <CommentNickname>{comment.nickName}</CommentNickname>
              <CommentContent>{comment.comment}</CommentContent>
              <DeleteBtn
                onClick={() => {
                  deleteCommentHandler(comment.id);
                }}
              >
                삭제
              </DeleteBtn>
            </CommentContainer>
          );
        })}
    </CommentsContainer>
  );
}

export default Comments;
