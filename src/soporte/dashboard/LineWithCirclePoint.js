import React from "react";
import {LineSeries, ScatterSeries} from '@devexpress/dx-react-chart-material-ui';
import {symbol, symbolCircle,} from 'd3-shape';
import 'moment/locale/es';


const Point = (type, styles) => (props) => {
    const {
        arg, val, color,
    } = props;
    return (
        <path
            fill={color}
            transform={`translate(${arg} ${val})`}
            d={symbol().size([10 ** 2]).type(type)()}
            style={styles}
        />
    );
};


const CrossPoint = Point(symbolCircle, {
    stroke: 'white',
    strokeWidth: '1px',
});

export default props => (
    <React.Fragment>
        <LineSeries.Path {...props} />
        <ScatterSeries.Path {...props} pointComponent={CrossPoint} />
    </React.Fragment>
);
