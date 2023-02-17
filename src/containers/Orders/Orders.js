import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, orders: fetchedOrders });
                console.log(fetchedOrders)
            })
            .catch(err => {
                this.setState({loading: false});
            });
    }

    render () {
        return (
            <div>
                {this.state.orders.map(ord => (
                    <Order 
                        key={ord.order.id}
                        ingredients={ord.order.ingredients}
                        price={ord.order.price} />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);