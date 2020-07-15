import Moment from "react-moment";
import React, {Fragment} from "react";

export default ({fecha, formato="DD/MM/YYYY HH:mm"}) => {
    return (
        <Fragment>
            {fecha ? <Moment date={fecha} local format={formato}/> : ''}
        </Fragment>
    )
}
