import React, {Fragment} from 'react';
import ContentWrapper from "components/common/ContentWrapper";
import MetaInfo from "components/common/MetaInfo";


export default () => {

    return (
        <Fragment>
            <MetaInfo
                title={'Proyectos'}
                description='Proyectos de Sebastián Blázquez.'
            />
            <ContentWrapper>
                Proyectos
            </ContentWrapper>
        </Fragment>
    )
};
