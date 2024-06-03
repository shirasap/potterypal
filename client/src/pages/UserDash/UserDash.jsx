import "./UserDash.scss";
import ItemCard from "../../components/ItemCard/ItemCard";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function UserDash() {
  return (
    <>
      <Header />
      This renders the user dashboard with a list of the items.
      <ItemCard />
      <Footer />
    </>
  );
}
