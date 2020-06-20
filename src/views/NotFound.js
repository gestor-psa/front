import React, {Fragment} from 'react';
import MetaInfo from "components/common/MetaInfo";


export default () => {

    return (
        <Fragment>
            <MetaInfo
                title={'404 Not Found'}
                description='Error, página no encontrada.'
            />
            <div>It looks like you are lost.</div>
        </Fragment>
    )
}