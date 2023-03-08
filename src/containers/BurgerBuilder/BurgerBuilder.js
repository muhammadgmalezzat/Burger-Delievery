import React, { Component } from 'react'
import { connect } from 'react-redux';
import Auxiliary from '../../HOC/auxiliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import Axios from '../../axios-orders';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'

import * as BurgerBuilderActions from '../../store/actions/index'
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
        purchasing: false,
    };
//====================================================================
    //function to get ingredients from firebase with 0 
    componentDidMount() {
        this.props.onIngredientsInit()
        };

//====================================================================
    //purchasable state handle function
    // we pass ingredients becouse we will call this function in first run application
    // and when we add or remove ingredients 
    purchasableStateHandle = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((igkey) => {
                return ingredients[igkey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    };
//====================================================================
    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onsetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }
    purchaseCancelHandler  = () => {
        this.setState({ purchasing: false });
    }
//====================================================================
    //this function is to pass ingredients as object choosen to checkout page by URL
    purchaseContinueHandle = () => {
        this.props.onInitPurchase();
        this.props.history.push({pathname: "/checkout"});
    }
//====================================================================
    render() {
        //this will loop in gredients if key <= 0 returns 1 else return 0
        const disabledInfo = {
        ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        //====================================================================
        let orderSummary = null;
        let burger = this.props.error?<h1>Ingredients Can't Be Loaded</h1> :<Spinner />;
        if (this.props.ings)
            {
            burger = (
                <Auxiliary>
                    <Burger ingredientsFromBuilderBurger={this.props.ings} />
                    <BuildControls
                            price={this.props.totalPrice}
                            // this property  ingredientAdded holds references to addIngredientHandler
                            //then we will pass it to the build control 
                            //so in build control we recieve ingredientAdded property 
                            //هنا بس الفانكشن اتعملها تنفيذ
                            ingredientAdded={this.props.onIngredientAdded}
                            ingredientRemoved={this.props.onIngredientRemoved}
                            disabled={disabledInfo}
                            INGREDIENT_PRICES={INGREDIENT_PRICES}
                            purchasable={this.purchasableStateHandle(this.props.ings)}
                        purchasing={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        />
                </Auxiliary>
            )
            orderSummary = (<OrderSummary
            ingredients={this.props.ings}
            totalPrice={this.props.totalPrice}
            purchaseCancel={this.purchaseCancelHandler }
            purchaseContinue={this.purchaseContinueHandle}
        />)
            }
        
        
        //====================================================================
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !==null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(BurgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(BurgerBuilderActions.removeIngredient(ingName)),
        onIngredientsInit: () => { dispatch(BurgerBuilderActions.initIngredients()) },
        onInitPurchase: () => dispatch(BurgerBuilderActions.purchaseInit()),
        onsetAuthRedirectPath:(path)=> dispatch(BurgerBuilderActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler( BurgerBuilder,Axios));