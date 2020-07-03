import Moment from "react-moment";
import React from "react";

export default ({fecha}) => {
    return (
        <Moment date={fecha} local format="DD/MM/YYYY HH:mm"/>
    )
}
