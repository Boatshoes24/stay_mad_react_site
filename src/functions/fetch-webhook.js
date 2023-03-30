const axios = require('axios');

exports.handler = async (event, context) => {


    try {
        const json = JSON.parse(event.body);
        const fields = json.data.fields;
        const values = json.data.values;

        let response = await axios.post(process.env.REACT_APP_WEBHOOK_URL, {
            headers: {
                "Content-Type": "application/json"
            },
            payload_json: JSON.stringify({
                "avatar_url": "https://i.imgur.com/DiHfi2e.png",
                "thread_name": `${values.name} - ${values.charSpec} ${values.charClass}`,
                "embeds": [
                  {
                    "title": `${values.charName} - ${values.charSpec} ${values.charClass}`,
                    "color": 15258703,
                    "fields": fields,
                    "thumbnail": {
                        url: "https://i.imgur.com/DiHfi2e.png"
                    },      
                    "footer": {
                      "text": "Powered by Shoes",
                      "icon_url": "https://i.imgur.com/DiHfi2e.png"
                    }
                  }
                ]
              })
        });

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
}