import Moment from "react-moment";
import React, {Fragment} from "react";

export default ({fecha}) => {
    return (
        <Fragment>
            {fecha ? <Moment date={fecha} local format="DD/MM/YYYY HH:mm"/> : ''}
        </Fragment>
    )
}
