import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { baseUrl } from "../../../redux/BaseUrl";
import './Room.css';
import { useHistory } from "react-router-dom";

const Room = props => {

    const history = useHistory();
    const routeChange = () => {
        let path = `/book-now`;
        history.push({
            pathname: path,
            state: { detail: props },
        });
    }

    return (
        <div style={{ float: "left" }} >
            <Card className="m-2 bg-light" >
                <CardBody className="">
                    <CardImg
                        alt="picture"
                        src={baseUrl + props.room.image}
                        style={{ width: "496px", height: "400px" }}
                    />
                    <div className="text-center">
                        <CardTitle className="element">Room Type: {props.room.title}
                        </CardTitle>
                        <CardText><span
                            className="element">
                            Price: {props.room.price}BDT</span></CardText>
                        <CardText><span
                            className="element">Available rooms: {props.room.available}</span></CardText>
                        <Button onClick={routeChange} disabled={!props.room.available > 0}
                            className="btn btn-success btn-lg element">Book Now</Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
export default Room;
