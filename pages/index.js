import { usePosts } from 'hooks/usePost'
import { MainLayout } from 'layouts'
import QList from 'components/QList'
import Pages from 'components/Pages'
import { makeStyles, ButtonGroup, Button, Box, Typography } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import { useRouter } from 'next/router'
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
    titleContainer: {
        display: 'flex',
        padding: theme.spacing(2),
        background: theme.palette.background.title
    },
    title: {
        flexGrow: 1,
    }
}))

export default function Home() {
    const classes = useStyles()
    const router = useRouter()
    const page = router.query.page || 1
    const sort = router.query.sort || -1
    const {data} = usePosts({page, sort})
    return (
        <MainLayout>
            <Box className={classes.titleContainer}>
                <Typography variant="h5" className={classes.title}>
                    <Filters/>
                </Typography>
                <Box marginY={'auto'}>
                    <Link href={'/question/ask'} passHref>
                        <Button color={'secondary'} variant={'contained'} disableElevation size='small'>
                            <FormattedMessage id='btn.ask'/>
                        </Button>
                    </Link>
                </Box>
            </Box>
            <QList items={data?.items || []}/>
            <Pages count={data?.pages} page={Number(page)}/>
        </MainLayout>
    )
}

function Filters() {
    const router = useRouter()
    const navigate = (sort) => {
        router.push({
            pathname: '/',
            query: {...router.query, sort}
        })
    }
    return (
        <ButtonGroup size='small'>
            <Button onClick={() => navigate(-1)}>
                <FormattedMessage id={'btn.newest'}/>
            </Button>
            <Button onClick={() => navigate(1)}>
                <FormattedMessage id={'btn.oldest'}/>
            </Button>
        </ButtonGroup>
    )
}