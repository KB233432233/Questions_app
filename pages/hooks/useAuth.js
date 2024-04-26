import axios from 'axios'
import { useEffect } from 'react';
import useSWR from 'swr';
import Router from 'next/router'

export const login = params => axios.post('/api/auth/login', params);

export const register = params => axios.post('/api/auth/register', params);


const fetcher = url => axios.get(url).then(({ data }) => data?.data)
export default function useAuth({ redirectTo = false, redirectIfFound = false } = {}) {
    const { data: user, error } = useSWR('/api/auth/me', fetcher);

    useEffect(() => {
        if (error && redirectTo && redirectIfFound) Router.push(redirectTo);
        if (user && redirectIfFound) Router.push(redirectTo);
    }, [user, error, redirectTo]);

    return {
        user,
        loading: !user && !error
    };
}