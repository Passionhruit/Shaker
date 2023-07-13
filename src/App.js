import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./shared/Router";
import { Reset } from "styled-reset";
import GlobalStyle from "./GlobalStyle";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Reset />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
