import useSWR from 'swr'
import axios from 'axios'

const url = '/api/tag'

const fetcher = url => axios.get(url).then(({ data }) => data?.data)

export function useTags() {
    const { data } = useSWR(url, fetcher)
    return {
        data: data || []
    }
}