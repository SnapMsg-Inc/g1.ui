import axios from "axios"
import { auth } from "./firebase";
import { getIdToken } from "firebase/auth";

export const sendMetricsDD = async (metric, type, value, tags=[]) => {
    const url = 'https://gateway-api-api-gateway-marioax.cloud.okteto.net/stats'
    const data = {
        "metric": metric,
        "type": type,
        'tags': tags,
        "value": `${value}`
    }   

    try {
        const token = await getIdToken(auth.currentUser, false);
        const response = await axios({
            method: 'post',
            url: url,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response)
            console.log('send metrics ', response.status)
    } catch (error) {
        console.error('Error submitting event to Datadog:', error?.response?.status);
    }
};
