import Navbar from "../components/layout/Navbar";
import BestSellers from "../components/BestSellers";
import WhyChooseUs from "../components/WhyChooseUs";
import NewArrivals from "../components/NewArrivals";
import CustomerReviews from "../components/CustomerReviews";
import InstagramGallery from "../components/InstagramGallery";
import AnnouncementBar from "../components/layout/AnnouncementBar";
import HeroSlider from "../components/Home/HeroSlider";
import CategorySection from "../components/Home/CategorySection";
import Footer from "../components/layout/Footer";
function App() {
  return (
    <>
      <HeroSlider />
      <CategorySection />
      <BestSellers />
      <NewArrivals />
      <CustomerReviews />
      <WhyChooseUs />
      <InstagramGallery />
      <Footer />
    </>
  );
}

export default App;