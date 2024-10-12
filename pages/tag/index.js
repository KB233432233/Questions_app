// Next.js
import Link from 'next/link'
import Head from 'next/head'
// Components
import { MainLayout } from 'layouts'
import { makeStyles, Grid, Card, CardActionArea, CardContent, Typography } from '@material-ui/core'
// Hooks
import { useTags } from 'hooks/useTag'

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3)
    },
    card: {
        height: 170
    }
}))

export default function Tags() {
    const classes = useStyles()

    const { data: tags } = useTags()

    return (
        <MainLayout title={'title.tags'}>

            <Head>
                <title>التصنيفات</title>
            </Head>

            <Grid container spacing={3} className={classes.container}>
                {
                    tags.map(({ name, slug, description }, index) =>
                        <Grid item sm={4} xs={6} key={index}>
                            <Link passHref href={`tag/${slug}`}>
                                <Card variant="outlined">
                                    <CardActionArea>
                                        <CardContent className={classes.card}>
                                            <Typography variant="h6" color="primary">
                                                {name}
                                            </Typography>
                                            <Typography variant="body2">
                                                {description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </Grid>
                    )
                }
            </Grid>

        </MainLayout>
    )
}
