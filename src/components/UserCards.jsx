import { useState, useEffect} from 'react';
import database from "../util/config";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Spinner } from 'react-bootstrap';
import { ref, onValue} from "firebase/database";
import Loading from './Loading';
import "../styles/usercard.css"
import profile from "../resources/images/profile.png"
import { Link } from 'react-router-dom'

const UserCard = () => {
        let [userNo, setUserNo ] = useState([]);
        let [loading, setLoading ] = useState(true);

        const AddNo = (value, orders) => {
                setUserNo((values) => {
                        return [...values, {
                                userNo: value,
                                orders
                        }];
                });
        }

        const FetchAll = () => {
                const starCountRef = ref(database, 'Orders');
                onValue(starCountRef, (snapshot) => {
                        setUserNo(() => { return [] });
                        const data = snapshot.val();
                        for (let values in data) {
                                let orders = 0;
                                for (let order in data[values]) {
                                        console.log(order);
                                        orders++;
                                }
                                AddNo(values, orders);
                        }

                        setLoading(() => {
                                return false;
                        })
                });
        }

        useEffect(() => {
                FetchAll()
        }, [])

        return(
                <>
                        {
                                !loading ? 
                                (
                                        <div className="orders-container">
                                                <div className="card-container">
                                                        <h2>User Ordered</h2>
                                                        {
                                                                userNo.map((data) => (
                                                                        <div style={{ margin: "10px 0px", maxWidth: "800px" }} body key={data} className = "user-card">
                                                                                <div className="profile-container">
                                                                                        <img style={{ width: "60px" }} src={profile} alt="" />
                                                                                        <div className="user-container">
                                                                                                <span style={{ margin: "0 10px", fontWeight: "600", fontSize: "1.1rem" }}>{data.userNo}</span>
                                                                                                <span style={{ margin: "0 10px", fontWeight: "500", fontSize: "0.8rem" }}>Orders: {data.orders}</span>
                                                                                        </div>
                                                                                </div>
                                                                                <div className="view-details-btn">
                                                                                        <Link to={"/user-orders/" + data.userNo} className='button'>
                                                                                                {'>'}
                                                                                        </Link>
                                                                                </div>
                                                                        </div>
                                                                ))
                                                        }
                                                </div>
                                                <div></div>
                                        </div>
                                ) : (<Loading />)
                        }
                </>
        )
}

export default UserCard;

