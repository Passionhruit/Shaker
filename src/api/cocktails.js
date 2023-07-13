import api from "../axios/api";

// axios 요청이 들어가는 모든 모듈

// 조회
const getCocktails = async () => {
  const response = await api.get(`/cocktails`);
  return response.data;
};

// 추가
const addCocktail = async (newCocktail) => {
  await api.post(`/cocktails`, newCocktail);
};

// 삭제

const deleteCocktail = async (id) => {
  await api.delete(`/cocktails/${id}`);
};

// 수정
const updateCocktail = async ({ id, updatedCocktail }) => {
  await api.patch(`/cocktails/${id}`, updatedCocktail);
};

export { getCocktails, addCocktail, deleteCocktail, updateCocktail };
