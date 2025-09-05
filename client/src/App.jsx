import { useState } from "react";
 

import Header from "./HeaderChef";
import Main from "./MainChef";

function App() {
  const [count , setCount] = useState(0);

  return (
    <>
    <Header/>
    <Main/>
    </>
  );
}
export default App;