import React from "react";
import {Helmet} from "react-helmet";


export default ({title, description}) => {

    return (
        <Helmet
            title={`PSA${title ? ' | ' + title : ''}`}
            meta={[
                // Regular Meta tags
                {name: 'description', content: description},
            ]}
        />
    )
}