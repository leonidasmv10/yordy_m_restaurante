import useSWR from 'swr';
import { fetcher } from '.';

export const useGetUser = () => {
    const { data, error, ...rest } = useSWR('/api/auth/me', async (url) => {
        const data = await fetcher(url);
        const res = await fetch(`/api/auth/roles?email=${data.email}`)
        const roles = await res.json();
        return { ...data, ...roles };
    });

    // const { data, error, ...rest } = useSWR('/api/auth/me', fetcher);
    return { data, error, loading: !data && !error, ...rest };
}