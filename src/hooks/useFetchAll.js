import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { apiCallTime, apiKeys, API_KEY } from '../apiKeys';
import { UpdateApiKey } from '../store/action/updateApi';

function useFetchAll(url, setData, source) {
    // apikey op

    const getApiKey = useSelector((state) => state.apiKey_Data.apiKey)

    const dispatch = useDispatch()

    const changeApiKey = () => {

        let currentApi = apiKeys[apiCallTime]
        dispatch(UpdateApiKey(currentApi))
        console.log('api key error status code 402 BUT DO NOT WORK API HAS BEEN CHANGED');

        apiCallTime++

        if (apiCallTime > 10) {
            apiCallTime = 0
        }
    }
    // 

    const [isLoading, setIsLoading] = useState(true);
    const apiKeyUrlRest = `/information?apiKey=${getApiKey}&includeNutrition=false`

    const fetchDatas = async () => {
        setIsLoading(true)

        const callFetch = async () => {
            const data = await Promise.all(
                source.map(async (id) => {
                    const response = await fetch(`${url}${id}${apiKeyUrlRest}`);
                    if (!response.ok) {
                        const message = `An error has occurred while getting data: ${response.status}`;
                        throw new Error(message);
                    }
                    return response;
                })
            );

            const jsonData = await Promise.all(data.map((result) => result.json()));
            setData(jsonData);
            setIsLoading(false)
        }

        try {
            callFetch()
        } catch (error) {
            if (error.response) {
                if (error.response.status) {
                    changeApiKey()
                }
            }
            console.log(error)
            setIsLoading(false)
        }
    }

    return { isLoading, fetchDatas }
}

export default useFetchAll