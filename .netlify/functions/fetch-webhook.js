import axios from 'axios';

exports.handler = async (event, context) => {
    try {
        let response = await axios.post(process.env.REACT_APP_WEBHOOK_URL);

        return {
            statusCode: 200,
            body: JSON.stringify(response)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error })
        };
    }
};