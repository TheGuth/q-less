import { AsyncStorage, AlertIOS } from 'react-native'
import { Actions } from 'react-native-router-flux';

export const retrieveBusinessInfo = (currentConnection) => dispatch => {
  return fetch(`https://vast-earth-24706.herokuapp.com/dashboard/${currentConnection}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }).then(data => {
    return dispatch(businessInfoSuccess(data));
  }).catch(error => {
    return dispatch(businessInfoError(error));
  });
};

export const BUSINESS_INFO_SUCCESS = 'BUSINESS_INFO_SUCCESS';
export const businessInfoSuccess = (data) => ({
    type: BUSINESS_INFO_SUCCESS,
    data: data
});

export const BUSINESS_INFO_ERROR = 'BUSINESS_INFO_ERROR';
export const businessInfoError = (currentConnection) => ({
    type: BUSINESS_INFO_ERROR,
    currentConnection: currentConnection
});

export const CONNECT_TO_BUSINESS = 'CONNECT_TO_BUSINESS';
export const connectToBusiness = (currentConnection) => ({
    type: CONNECT_TO_BUSINESS,
    currentConnection: currentConnection
});

/////////////////////////////////////////////////////

export const LOAD_MENU = 'LOAD_MENU';
export const loadMenu = (data) => ({
    type: LOAD_MENU,
    data: data
});

export const LOAD_MENU_ERROR = 'LOAD_MENU_ERROR';
export const loadMenuError = (error) => ({
    type: LOAD_MENU_ERROR,
    error: error
});

////////////////////////////////////////////////

export const submitOrder = (userNameInput, userEmailInput, userTableInput, orders, currentConnection) => dispatch => {
  let myToken = '';
  AsyncStorage.getItem('token').then((response) => {
    return response;
  })
  .then((myToken) => {
    let orderTotal = 0;
    orders.forEach((order) => {
      orderTotal += order.price;
    })
    const data = {clientName: userNameInput, table: userTableInput, clientEmail: userEmailInput, order: orders, totalDrinks: orders.length, orderTotal: orderTotal }
    return fetch(`https://vast-earth-24706.herokuapp.com/order/${currentConnection}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': myToken
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then(data => {
      AlertIOS.alert(
        'Your order has been received'
      );
      Actions.dashboard();
      return dispatch(orderSuccess());
    }).catch(error => {
      AlertIOS.alert(
        'Something went wrong. Please try again'
      );
      Actions.checkout();
      return dispatch(orderFailure(error));
    });
  });
};

export const fetchMenu = (currentConnection) => dispatch => {

  return fetch(`https://vast-earth-24706.herokuapp.com/dashboard/${currentConnection}/drinks/0`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OTAwYmY4MmJiOWFiNTAwMWM5ZmJjMDgiLCJpYXQiOjE0OTMyMjEyNTA3MDd9.I9q8OFGx6RHuhil7NsFinZgRFCGsRHJBVJ4Tk56C1Bk'
      }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }).then(data => {
    return dispatch(loadMenu(data))
  }).catch(error => {
    return dispatch(loadMenuError(error));
  });
}

export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const orderSuccess = () => ({
    type: ORDER_SUCCESS
});

export const ORDER_FAILURE = 'ORDER_FAILURE';
export const orderFailure = (error) => ({
    type: ORDER_FAILURE,
    error: error
});

///////////////////////////////////////

export const REMOVE_ORDER = 'REMOVE_ORDER';
export const removeOrder = (id) => ({
    type: REMOVE_ORDER,
    id: id
});

export const REMOVE_ORDER_ERROR = 'REMOVE_ORDER_ERROR';
export const removeOrderError = (error) => ({
    type: REMOVE_ORDER_ERROR,
    error: error
});

export const ADD_ORDER = 'ADD_ORDER';
export const addOrder = (drinkName, price, quantity, id) => ({
  type: ADD_ORDER,
  drinkName,
  price,
  quantity,
  id
});

export const ADD_ORDER_ERROR = 'ADD_ORDER_ERROR';
export const addOrderError = (error) => ({
    type: ADD_ORDER_ERROR,
    error: error
});


//////////////////////////////////////
