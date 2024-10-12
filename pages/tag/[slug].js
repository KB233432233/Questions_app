import { usePosts } from 'hooks/usePost'
import { MainLayout } from 'layouts'
import QList from 'components/QList'
import Pages from 'components/Pages'
import { makeStyles, Button, Box, Typography } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Tag from 'models/tag'
import dbConnect from 'utils/dbConnect'

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

export default function Show({params: tag}) {
    const classes = useStyles()
    const router = useRouter()
    const page = router.query.page || 1
    const {data} = usePosts({page, tag: tag?.id})
    return (
        <MainLayout>
            <Head>
                <title>{tag?.name}</title>
            </Head>
            <Box className={classes.titleContainer}>
                <Typography variant="h5" className={classes.title}>
                    {tag?.name}
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

export async function getStaticPaths() {
    await dbConnect()
    const items = await Tag.find({}).exec()
    const paths = items.map(e => ({params: {slug: e.slug.toString()}}))
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({params}) {
    await dbConnect()
    let item = await Tag.findOne({slug: params.slug}).exec()
    return {
        props: {
            params: JSON.parse(JSON.stringify(item))
        }
    }
}