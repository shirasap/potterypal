import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import EditItemPage from "./pages/EditItemPage/EditItemPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";
import ItemDetails from "./components/ItemDetails/ItemDetails";
import UserDash from "./pages/UserDash/UserDash";
import NotFound from "./pages/NotFound/NotFound";
import "./App.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/:id" element={<UserDash />} />
          <Route path="/piece/:id" element={<ItemDetails />} />
          <Route path="/piece/edit/:id" element={<EditItemPage />} />
          <Route path="/piece/add" element={<AddItemPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
