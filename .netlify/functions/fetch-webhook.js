const handler = async (event) => {
    const POST_URL = process.env.REACT_APP_WEBHOOK_URL;

    try {
        const { data } = axios.post(POST_URL)

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch (error) {
        const { status, statusText, headers, data } = error.response;

        return {
            statusCode: status,
            body: JSON.stringify({ status, statusText, headers, data })
        }
    }
}

module.exports = { handler };