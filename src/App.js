import database from "./util/config";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Spinner } from 'react-bootstrap';
import { ref, onValue} from "firebase/database";
import Navbar from './components/Navbar';
import "./styles/main.css";
import UserCard from "./components/UserCards";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import OrderCard from './components/OrderCard'
import SingleOrder from "./components/SingleOrder";

const App = () => {

        return (
                <>
                        <Router>
                                <Navbar></Navbar>
                                <Routes>
                                        <Route path="/" element={<UserCard />}  />
                                        <Route path="/user-orders/:userId" element={<OrderCard />}  />
                                        <Route path="/ordered-product/:userId/:orderId" element={<SingleOrder />}  />
                                </Routes>
                        </Router>
                </>
        );
}

export default App;
