import React, { Component } from 'react'
import Auxiliary from '../../HOC/auxiliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import Axios from '../../axios-orders';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'
//import { useNavigate } from 'react-router';
//====================================================================
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};
//====================================================================
class BurgerBuilder extends Component {
    state = {
        ingredients:null,
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false,
        error:false
    };
    //====================================================================


    //====================================================================

    componentDidMount() {
        console.log(this.props);
        Axios.get("https://burger-builder-85a88-default-rtdb.firebaseio.com/ingredients.json").then((response) => {
            console.log(response.data);
            this.setState({ ingredients: response.data })
            console.log(this.state.ingredients);
            
        })
            .catch(err => {
                this.setState({error: err})
            })
        };

    //====================================================================
    //add ingredient button function
    addIngredientHandler = (type) => {
        //console.log("addIngredientHandler")
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
        });
        this.purchasableStateHandle(updatedIngredients);;
    };
    //====================================================================
    //less ingredient button function
    removeIngredientHandler =  (type) => {
        //console.log("removeIngredientHandler")
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) return;
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
        });
        this.purchasableStateHandle(updatedIngredients);
    };
    //====================================================================
    //purchasable state handle function
    // we pass ingredients becouse we will call this function in first run application
    // and when we add or remove ingredients 
    //in 
    purchasableStateHandle = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((igkey) => {
                return ingredients[igkey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        //console.log(sum);
        this.setState({
            purchasable: sum > 0,
        });
    };
    //====================================================================

    purchaseHandler  = () => {
        this.setState({ purchasing: true });
    }
    purchaseCancelHandler  = () => {
        this.setState({ purchasing: false });
    }
    //====================================================================

    purchaseContinueHandle = () => {
        // this.setState({ loading: true });
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice.toFixed(2),
        //     customer: {
        //         name: "Gemy",
        //         address: {
        //             street: "Test street ",
        //             zipCode: "1234",
        //             country: "Egypt",
        //         },
        //         email: "test@test.com",
        //     },
        //     deliveryMethod: "fastest",
        // };
        // Axios.post('/orders.json', { order }).then(response => {
        //     //console.log(response)
        //     this.setState({ loading: false ,purchasing:false})
        // }).catch(err => this.setState({ loading: false, purchasing: false }))
        
        // const navigate = useNavigate()
        // navigate('checkout')

        console.log(this.props.history)
        //this.props.history.push('/checkout')
        //this.props.history.go();
        //console.log(this.props.history)

        const queryParams = [];
        for (let i in this.state.ingredients) {
        //console.log(this.state.ingredients[i].name)
        queryParams.push(
            encodeURIComponent(i) +
            "=" +
            encodeURIComponent(this.state.ingredients[i])
        );
        }
        queryParams.push('price='+this.state.totalPrice)
    //====================================================================
    const queryString = queryParams.join("&");
    console.log(queryString)
        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryString,
        });
        //this.props.history.go();
        //this.location.reload();
    }
    //====================================================================

    render() {
        //console.log(this.state);
        //this will loop in gredients if key <= 0 returns 1 else return 0
        const disabledInfo = {
        ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        //console.log("dis", disabledInfo)
        //====================================================================
        let orderSummary = null;
        let burger = this.state.error?<h1>Ingredients Can't Be Loaded</h1> :<Spinner />;
        if (this.state.ingredients)
            {
            burger = (
                <Auxiliary>
                    <Burger ingredientsFromBuilderBurger={this.state.ingredients} />

                    <BuildControls
                            price={this.state.totalPrice}
                            // this property  ingredientAdded holds references to addIngredientHandler
                            //then we will pass it to the build control 
                            //so in build control we recieve ingredientAdded property 
                            //هنا بس الفانكشن اتعملها تنفيذ
                            ingredientAdded={this.addIngredientHandler}
                            ingredientRemoved={this.removeIngredientHandler}
                            disabled={disabledInfo}
                            INGREDIENT_PRICES={INGREDIENT_PRICES}
                            purchasable={this.state.purchasable}
                            purchasing={this.purchaseHandler}
                        />
                </Auxiliary>
            )
            orderSummary = (<OrderSummary
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            purchaseCancel={this.purchaseCancelHandler }
            purchaseContinue={this.purchaseContinueHandle}
        />)
            }
        
        if (this.state.loading) {
            orderSummary= <Spinner />
        }
        //====================================================================
        
        return (
            <Auxiliary>
                <Spinner />
                
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>

                {burger}
                
            </Auxiliary>
    )
    }
};

export default  withErrorHandler( BurgerBuilder,Axios);