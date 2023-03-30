const axios = require('axios');
const jsonc = require('jsonc');

exports.handler = async (event, context) => {

        let data;
        try {   
            const e = jsonc.parse(event.body).data;

            data = await axios.post(process.env.REACT_APP_WEBHOOK_URL, {
                headers: {
                    "Content-Type": "application/json",
                },
                payload_json: {
                    "avatar_url": "https://i.imgur.com/DiHfi2e.png",
                    "thread_name": `${e.values.name} - ${e.values.charSpec} ${e.values.charClass}`,
                    "embeds": [
                    {
                        "title": `${e.values.charName} - ${e.values.charSpec} ${e.values.charClass}`,
                        "color": 15258703,
                        "fields": e.fields,
                        "thumbnail": {
                            "url": "https://i.imgur.com/DiHfi2e.png"
                        },      
                        "footer": {
                        "text": "Powered by Shoes",
                        "icon_url": "https://i.imgur.com/DiHfi2e.png"
                        }
                    }
                    ]
                }
            }).then(res => res.json());
        } catch (e) {
            console.log(e.message);
            return {
                statusCode: 500,
                body: JSON.stringify({
                    error: e.message
                })
            }
        }
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
}