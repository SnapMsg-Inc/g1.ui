import axios from "axios"
import Config from "react-native-config"

export const sendMetricsDD = async (title, text, agg_key) => {
    const datadogApiUrl = 'https://api.us5.datadoghq.com/api/v1/events'
    const tags =  ['app:snapmsg_android', 'env:prod']
    const data = {
        title,
        text,
        tags,
        priority: 'normal', // Set priority to normal to potentially extend retention
        aggregation_key : agg_key,    
    };
  
    try {
      const response = await axios.post(datadogApiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          'DD-API-KEY': Config.DD_API_KEY,
        },
      });
      if (response)
        console.log('send metrics ', response.status)
    } catch (error) {
      console.error('Error submitting event to Datadog:', error.response);
    }
};
