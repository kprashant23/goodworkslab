import React from 'react';
import './ProductDetails.css'
const ProductDetails = (props) => {
    return(
        <tr>
            <td style={{color: !props.stocked ? 'red' : 'black'}}>{props.name}</td>
            <td>{props.category}</td>
            <td>{props.price}</td>
        </tr>
    )
}

export default ProductDetails;