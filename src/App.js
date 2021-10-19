import "./App.scss";
import "swiper/swiper.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Routes from "./config/Routes";

import Header from './components/header/Header';
import Footer from "./components/footer/Footer";

function App() {
   return (
      <Router>
         <Route
            render={(props) => (
               <>
                  <Header {...props} />
                  <Routes />
                  <Footer />
               </>
            )}
         />
      </Router>
   );
}

export default App;
