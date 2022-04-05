import { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import database from "../util/config";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ref, onValue, remove, update} from "firebase/database";
import Loading from './Loading';
import "../styles/SingleOrders.css"
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom'


const SingleOrder = () => {
        const { userId, orderId } = useParams();
        let [productDetails, setProductDetails ] = useState([]);
        let [loading, setLoading ] = useState(true);
        let [userInfo, setUserInfo ] = useState({})
        let [totalPrice, setTotalPrice ] = useState('')
        let [message, setMessage ] = useState('')
        let [submit, setSubmit] = useState(false)
        let [couponCost, setCouponCost ] =useState('')
        const component = useRef()
        let navigate = useNavigate()

        const AddProducts = (title, description, url, price, quantity, message) => {
                setProductDetails((values) => {
                        return [...values, {
                                title,
                                description,
                                url,
                                price,
                                quantity, 
                                message
                        }];
                });
        }

        const Print = useReactToPrint({
                content : () => component.current,
        })

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

        const DeleteOrder = () => {
                const userRef = ref(database, "Orders/" + userId + "/" + orderId);
                remove(userRef)
                navigate("/")
        }

        const handleChange = (e) => {
                setMessage(e.target.value)
        }

        const sendMessage = () => {
                const starCountRef = ref(database, "Orders/" + userId + "/" + orderId);
                update(starCountRef, {
                        delivery_message : message
                })
                setSubmit(() => true)
                setTimeout(() => {
                        setSubmit(() => false)
                }, 3000)
        }

        const FetchAll = () => {
                const starCountRef = ref(database, 'Orders');

                setProductDetails(() => { return [] });
                onValue(starCountRef, (snapshot) => {
                        setProductDetails(() => [])
                        const rawData = snapshot.val();
                        const data = rawData[userId];
                        const productsData = data[orderId];
                        const products = productsData.productData
                        setCouponCost(() => productsData.coupon)
                        setMessage(() => data[orderId].delivery_message) 

                        for (let value in products) {
                                const id = products[value].id
                                const quantity = products[value].quantity
                                const productData = ref(database, 'AllProducts/' + id);
                                onValue(productData, (snapshot) => {
                                        const raw = snapshot.val();
                                        const { description, price, title, url } = raw;
                                        if (Number.isNaN(parseInt(price))) 
                                                AddProducts(title, description, url, products[value].price, quantity);
                                        else
                                                AddProducts(title, description, url, price, quantity);
                                })
                        }

                        setTotalPrice(() => productsData.totalCost)

                        FetachUser()

                        setLoading(() => {
                                return false;
                        })
                });
        }

        useEffect(() => {
                FetchAll()
        }, [])

        return (
                <>
                        {
                                !loading ? 
                                (
                                        <>

                                                <div ref={component} className="single-orders-container" id='single-orders-container'>
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
                                                                                <h3>Delivery Address: </h3>
                                                                                <span>{userInfo.location}</span>
                                                                        </div>
                                                                        <div className="field">
                                                                                <h3 style={{display: "inline"}}>Purchase Amount: </h3><p  style={{display: "inline", fontSize: "0.85rem", color:"rgba(0,0,0,0.8)"}}>Inc. delivery charges</p>
                                                                                <span>{
                                                                                                (parseInt(totalPrice)).toLocaleString('en-US', {
                                                                                                        style: 'currency',
                                                                                                        currency: 'INR'
                                                                                                })
                                                                                        }</span>
                                                                        </div>
                                                                        <div className="field">
                                                                                <h3>Discounted Price: </h3>
                                                                                <span>{
                                                                                        Number.isNaN(parseInt(couponCost)) ? "₹0" :  (parseInt(couponCost)).toLocaleString('en-US', {
                                                                                                style: 'currency',
                                                                                                currency: 'INR'
                                                                                        })
                                                                                        }</span>
                                                                        </div>
                                                                        <div className="field">
                                                                                <h3>Message Status: </h3>
                                                                                <input type="text" placeholder='Message' value={message} onChange={handleChange}  />
                                                                                <button onClick={sendMessage}>Set Message</button>
                                                                        </div>
                                                                        {
                                                                                submit ? (
                                                                                        <div className="field">
                                                                                                <p style={{ 
                                                                                                        fontSize: "0.85rem",
                                                                                                        color: "#000000", 
                                                                                                        fontWeight: "600",
                                                                                                        position: "absolute",
                                                                                                        padding: "10px 20px",
                                                                                                        top: "10%",
                                                                                                        left: "50%",
                                                                                                        transform: "translateX(-50%)",
                                                                                                        backgroundColor: "#ffffff",
                                                                                                        border: "1px solid rgba(0,0,0,0.5)",
                                                                                                        borderRadius: "10px",
                                                                                                        zIndex: "1000",
                                                                                                        boxShadow: "0 0 30px rgba(189, 189, 189, 0.63)"
                                                                                                        }}>Message has sent</p>
                                                                                        </div>
                                                                                ) : ('')
                                                                        }
                                                                </div>
                                                        </div>

                                                        <div className="card-container" >       
                                                                <h2>User Ordered</h2>
                                                                {
                                                                        productDetails.reverse().map((data) => (
                                                                                <div style={{ margin: "10px 0px", maxWidth: "800px" }} body key={data} className = "user-card">
                                                                                        <div className="profile-container">
                                                                                                <img style={{ width: "60px" }} src={data.url} alt="" />
                                                                                                <div className="user-container">
                                                                                                        <span style={{ margin: "0 10px", fontWeight: "600", fontSize: "1.1rem" }}>{data.title}</span>
                                                                                                        <span style={{ margin: "0 10px", fontWeight: "500", fontSize: "0.8rem" }}>
                                                                                                                Price: {
                                                                                                                        (parseInt(data.price)).toLocaleString('en-US', {
                                                                                                                                style: 'currency',
                                                                                                                                currency: 'INR'
                                                                                                                        })        
                                                                                                                }
                                                                                                        </span>
                                                                                                </div>
                                                                                        </div>
                                                                                        <div className="view-details-btn">
                                                                                                <span style={{ fontWeight: "600", fontSize: "0.9rem", textDecoration: "none" }}>Qty: {data.quantity}</span>
                                                                                                {/* <Link to={"/ordered-product/" + userId + "/" + data.key} className='button'>
                                                                                                        {'>'}
                                                                                                </Link> */}
                                                                                        </div>
                                                                                </div>
                                                                        ))
                                                                }
                                                        </div>
                                                </div>

                                                <div className='btn-container'>
                                                        <button onClick={Print}>Print</button>
                                                        <button onClick={DeleteOrder}>Delete</button>
                                                </div>
                                        </>
                                ) : (<Loading />)
                        }
                </>
        )
}

export default SingleOrder;