import React from "react";
import Header from "./Header/Header";
import Body from "./Body/Body";

const Main = () => {
    return (
        <div>
            <div style={{ marginBottom: "80px" }}>
                <Header />
            </div>
            <Body />
        </div>
    )
}

export default Main;