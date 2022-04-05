import { Spinner } from 'react-bootstrap';


const Loading = () => {
        return (
                <div style={{ width: "100%", height: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Spinner  style={{ margin: "10px 50px" }} animation="grow" />
                </div>
        )
}

export default Loading;