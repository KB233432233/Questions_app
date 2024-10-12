import useSWR from 'swr'
import axios from 'axios'

const url = '/api/post'

const fetcher = url => axios.get(url).then(({ data }) => data?.data)

export function usePosts({ page = 1, sort = -1, tag = '' }) {
    const _url = `${url}?page=${page}&sort=${sort}&tag=${tag}`
    const { data, error } = useSWR(_url, fetcher)
    return {
        data: data,
        error,
        loading: !data && !error,
    }
}

export default function usePost(id) {
    const _url = `${url}/${id}`
    const { data, error, mutate } = useSWR(_url, fetcher)
    const answer = async (params) => {
        await axios.post('/api/post/answer', { ...params, question: id })
        await mutate({ ...data })
    }
    const vote = async (id, type) => {
        await axios.post(`${url}/vote`, { post: id, type })
        await mutate({ ...data })
    }
    return {
        data,
        error,
        loading: !data && !error,
        answer,
        vote
    }
}

export const ask = async (params) => {
    const { data } = await axios.post('/api/post/question', params)
    return data?.data?.id
}