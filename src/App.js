import Router from "./Components/Router";
import DefaultContextProvider from "../src/Components/context";
import "./static/css/resetStyle.css";

function App() {
  return (
    <DefaultContextProvider>
      <Router />
    </DefaultContextProvider>
  );
}

export default App;
