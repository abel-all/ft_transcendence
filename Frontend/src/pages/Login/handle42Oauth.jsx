import Axios from 'axios'

const handle42OauthClick = async () => {
    console.log("42");
    // send request to backend contain info of user want to login with 42 acc
    await Axios.post("https://fakestoreapi.com/products/1")
    .then(response => {
        console.log(response);
        if (response.status == 200 || response.status == 304) {
            window.location.href = response.data.oauthurl42;
        }
        else {
            console.error("Please try again")
        }
    }).catch(err => {
        console.error(err);
    })
}



export { handle42OauthClick }