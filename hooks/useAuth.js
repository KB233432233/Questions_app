import axios from 'axios'
import { useEffect } from 'react'
import useSWR from 'swr'
import Router from 'next/router'

const url = '/api/auth'

export const login = params => axios.post(`${url}/login`, params)
export const register = params => axios.post(`${url}/register`, params)
export const logout = async (mutate) => {
    await axios.post(`${url}/logout`);
    mutate()
}

const fetcher = url => axios.get(url).then(({data}) => data?.data)

export default function useAuth({redirectTo = false, redirectIfFound = false} = {}) {

    const {data: user, error, mutate} = useSWR(`${url}/me`, fetcher);

    useEffect(() => {
        if (error && redirectTo && !redirectIfFound) Router.push(redirectTo);
        if (user && redirectIfFound) Router.push(redirectTo);
    }, [user, error, redirectTo, redirectIfFound]);

    return {
        user,
        loading: !user && !error,
        logout: () => logout(mutate)
    }

}
