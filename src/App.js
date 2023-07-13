import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./shared/Router";
import { Reset } from "styled-reset";
import { useEffect } from "react";
import app from "./service/firebase";
import GlobalStyle from "./GlobalStyle";

const queryClient = new QueryClient();

function App() {
  // useEffect(() => {
  //   // console.log("app", app);
  // }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Reset />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
