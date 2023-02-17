import Axios from 'axios'

const instance = Axios.create({
    baseURL:'https://burger-builder-85a88-default-rtdb.firebaseio.com/'
});

export default instance;