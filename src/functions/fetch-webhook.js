const axios = require('axios');
const jsonc = require('jsonc');

exports.handler = async (event, context) => {

        try {   
            const { name, 
                age,
                discord,
                btag,
                charName,
                charServer,
                charClass,
                charSpec,
                charOSpec,
                raidTimes,
                historyGuilds,
                historyRaids,
                wclLink,
                vouch,
                extraInfo 
            } = jsonc.parse(event.body).data

            const blank = "\u200b"

            const fields = [
                {"name": "Name", "value": name, "inline": true},
                {"name": "Age", "value": age, "inline": true},
                {"name": blank, "value": blank, "inline": true},
                {"name": "Discord", "value": discord, "inline": true},
                {"name": "Btag", "value": btag, "inline": true},
                {"name": blank, "value": blank, "inline": true},
                {"name": "Character", "value": charName, "inline": true},
                {"name": "Server", "value": charServer, "inline": true},
                {"name": blank, "value": blank, "inline": true},
                {"name": "Class", "value": charClass, "inline": true},
                {"name": "Spec", "value": charSpec, "inline": true},
                {"name": blank, "value": blank, "inline": true},
                {"name": "Off Specs", "value": charOSpec, "inline": false},
                {"name": "Warcraft Logs", "value": wclLink, "inline": false},
                {"name": "Raid Times", "value": raidTimes, "inline": false},
                {"name": "Vouch", "value": vouch, "inline": false},
                {"name": "Raid History", "value": historyRaids, "inline": false},
                {"name": "Guild History", "value": historyGuilds, "inline": false},
                {"name": "Misc", "value": extraInfo, "inline": false},
            ]
            
            const payload = {
                "avatar_url": "https://i.imgur.com/DiHfi2e.png",
                "thread_name": `${name} - ${charSpec} ${charClass}`,
                "embeds": [
                    {
                        "title": `${charName} - ${charSpec} ${charClass}`,
                        "color": 15258703,
                        "fields": fields,
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

            const res = await axios.post(process.env.REACT_APP_WEBHOOK_URL, {
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json"
                },
                payload_json: JSON.stringify(payload)
            })
        } catch (err) {
            console.log(err);
            return {
                statusCode: 500,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ msg: err.message })
            }
        }
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ msg: "Request was successful" })
        }
}