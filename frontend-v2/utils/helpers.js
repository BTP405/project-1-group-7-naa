const loginRoute = 'http://localhost:5000/register'
const registerRoute = 'http://localhost:5000/register'

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const registerUser = async (data) => {

    useFetch(registerRoute, {
        method: 'POST',
        body: data
    }).then(responseData => {
        console.log(responseData);
    }).catch(error => {
        // Handle errors here
        console.error("An error occurred while registering the user:", error);
    });

}

export const loginUser = async (data) => {

    

}