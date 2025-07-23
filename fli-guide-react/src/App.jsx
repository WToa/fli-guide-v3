// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipeCalculator from "./pages/RecipeCalculator";

const App = () => {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe-calculator" element={<RecipeCalculator />} />
         </Routes>
      </Router>
   );
};

export default App;
