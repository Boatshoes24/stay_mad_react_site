import axios from 'axios';

const handler = async (event) => {
    const POST_URL = process.env.REACT_APP_WEBHOOK_URL;

    console.log(event);

    try {
        const { data } = axios.post(POST_URL)

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch (error) {
        alert(error);
    }
}

module.exports = { handler };