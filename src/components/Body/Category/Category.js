import React, { Component } from "react";
import Room from "../Room/Room";

class Category extends Component {

    render() {
        // console.log("CategoryValueNow", this.props);
        const currentCategory = this.props.category.map(item => {
            let room = <Room key={item.roomId} room={item} />
            return room;
        })
        return (
            <div className="container mt-3">
                <h1 className="text-center text-muted my-3 danger">{this.props.categoryName}</h1>
                {currentCategory}
            </div>
        )
    }
}
export default Category;