import { useState } from 'react'

function useFetchAll(url, setData, source) {
    const [isLoading, setIsLoading] = useState(true);
    const apiKeyUrlRest = `/information?apiKey=37dfce836f234b8a9c7ba7bb0eb13dd1&includeNutrition=false`

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
            console.log(error)
            setIsLoading(false)
        }
    }

    return { isLoading, fetchDatas }
}

export default useFetchAll