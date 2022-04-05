import { useState, useEffect} from 'react';
import database from "../util/config";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ref, onValue} from "firebase/database";
import Loading from './Loading';
import "../styles/usercard.css"
import orderPng from "../resources/images/order.png"
import { Link, useParams } from 'react-router-dom'

const OrderCard = () => {
        const { userId } = useParams();
        let [userNo, setUserNo ] = useState([]);
        let [loading, setLoading ] = useState(true);
        let [userInfo, setUserInfo ] = useState({})

        const AddNo = (value, orders, products, key) => {
                setUserNo((values) => {
                        return [...values, {
                                userNo: value,
                                orders, 
                                products,
                                key
                        }];
                });
        }

        const FetachUser = () => {
                const userRef = ref(database, "Users/" + userId);
                onValue(userRef, (snapshot) => {
                        const { name, email, phone, address } = snapshot.val();
                        let { city, location, state } = address;
                        location = location + ", " + state + ", " + city

                        setUserInfo(() => {
                                return {
                                        name,
                                        email,
                                        phone,
                                        location
                                }
                        })
                })
        }

        const FetchAll = () => {
                const starCountRef = ref(database, 'Orders');
                setUserNo(() => { return [] });
                onValue(starCountRef, (snapshot) => {
                        setUserNo(() => [])
                        const rawData = snapshot.val();
                        const data = rawData[userId];
                        for (let keys in data) {
                                const orderTitle = data[keys].date
                                const products = data[keys].productData
                                const count = Object.keys(products).length
                                
                                AddNo(orderTitle, count, products, keys)
                        }

                        FetachUser()

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
                                                                userNo.reverse().map((data) => (
                                                                        <div style={{ margin: "10px 0px", maxWidth: "800px" }} body key={data} className = "user-card">
                                                                                <div className="profile-container">
                                                                                        <img style={{ width: "60px" }} src={orderPng} alt="" />
                                                                                        <div className="user-container">
                                                                                                <span style={{ margin: "0 10px", fontWeight: "600", fontSize: "1.1rem" }}>Placed on {data.userNo}</span>
                                                                                                <span style={{ margin: "0 10px", fontWeight: "500", fontSize: "0.8rem" }}>Products: {data.orders}</span>
                                                                                        </div>
                                                                                </div>
                                                                                <div className="view-details-btn">
                                                                                        <Link to={"/ordered-product/" + userId + "/" + data.key} className='button'>
                                                                                                {'>'}
                                                                                        </Link>
                                                                                </div>
                                                                        </div>
                                                                ))
                                                        }
                                                </div>

                                                <div className="user-details">
                                                        <h2>User Details</h2>

                                                        <div className="details-card">
                                                                <div className="field">
                                                                        <h3>Name: </h3>
                                                                        <span>{userInfo.name}</span>
                                                                </div>
                                                                <div className="field">
                                                                        <h3>Phone No: </h3>
                                                                        <span>{userInfo.phone}</span>
                                                                </div>
                                                                <div className="field">
                                                                        <h3>Email Id: </h3>
                                                                        <span>{userInfo.email}</span>
                                                                </div>
                                                                <div className="field">
                                                                        <h3>Address: </h3>
                                                                        <span>{userInfo.location}</span>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                ) : (<Loading />)
                        }
                </>
        )
}

export default OrderCard;