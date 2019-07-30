import React, {Component} from 'react';
import axios from 'axios';
import ProductDetails from './ProductDetails';
import './ProductDetails.css'

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            inputValue:"",
            isChecked: false,
            data:[]
        }
    }

    componentDidMount(){
        axios.get("https://api.myjson.com/bins/109m7i").then(
            (response) => {
                this.setState({data: response.data})
            }
        )
    }

    handleClick = () => {
        this.setState({isChecked: !this.state.isChecked});
    }

    handleChange = (event) => {
        this.setState({inputValue: event.target.value})
    }

    render(){
        const data = this.state.data
        return(
            <div>
                <input
                type="text"
                name="inputValue"
                value={this.state.inputValue}
                placeholder="Search..."
                onChange={this.handleChange}
                />
                <br/>
                <input
                type="checkbox"
                name="checked"
                value="checked"
                onClick={this.handleClick}/>
                Only show products in stock
                <br/>
                <hr/>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((product, i) => {
                            if(this.state.isChecked){
                                if(product.stocked){
                                    return (
                                        <ProductDetails
                                        key={i}
                                        name={product.name}
                                        category={product.category}
                                        price={product.price}
                                        stocked={product.stocked}
                                        />
                                    )
                                }
                            }else if(this.state.inputValue){
                                if(product.name.toLowerCase().includes(this.state.inputValue.toLowerCase())){
                                    return (
                                        <ProductDetails
                                        key={i}
                                        name={product.name}
                                        category={product.category}
                                        price={product.price}
                                        stocked={product.stocked}
                                        />
                                    )
                                }
                            }else{
                                return (
                                    <ProductDetails
                                    key={i}
                                    name={product.name}
                                    category={product.category}
                                    price={product.price}
                                    stocked={product.stocked}
                                    />
                                )
                            }
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Search;