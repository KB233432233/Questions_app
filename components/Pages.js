import { Pagination } from '@material-ui/lab'
import { Box } from '@material-ui/core'
import { useRouter } from 'next/router'

export default function Pages({count, page = 1}) {
    const router = useRouter()
    const onChange = (e, page) => {
        router.push({
            pathname: '/',
            query: {...router.query, page}
        })
    }
    return (
        <Box display="flex" justifyContent="center" p={3}>
            <Pagination
                count={count}
                variant="outlined"
                color="primary"
                page={page}
                onChange={onChange}
            />
        </Box>
    )
 }
 
 