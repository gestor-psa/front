import React, {Fragment} from 'react';
import ContentWrapper from "components/common/ContentWrapper";
import MetaInfo from "components/common/MetaInfo";



export default () => {

    return (
        <Fragment>
            <MetaInfo
                title={'Experiencia laboral'}
                description='Experiencia laboral de Sebastián Blázquez.'
            />
            <ContentWrapper>
                Experiencia laboral
            </ContentWrapper>
        </Fragment>
    )
}
