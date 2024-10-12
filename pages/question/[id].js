import React, { useEffect, useState } from 'react'
import { MainLayout } from 'layouts'
import dbConnect from 'utils/dbConnect'
import Post from 'models/post'
import Head from 'next/head'
import Router from 'next/router'
import usePost from 'hooks/usePost'
import useAuth from 'hooks/useAuth'
import { Content, Tags, Vote } from 'components/question'
import { Editor } from 'components/inputs'
import { makeStyles, Box, Avatar, Typography, Divider, Button } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import moment from 'utils/moment'

const useStyles = makeStyles((theme) => ({
    answersTitle: {
        background: theme.palette.background.title,
        padding: theme.spacing(2)
    },
    answerForm: {
        '& > *': {
            margin: theme.spacing(0, 0, 2, 0),
        },
        background: theme.palette.background.title
    }
}))

export default function Show({params}) {

    useEffect(() => {
        if (!params?.id) Router.push('/404')
    }, [params])

    const {data: post, loading, answer, vote} = usePost(params?.id)
    const {user} = useAuth()

    return (
        <MainLayout title={post?.question?.title} loading={loading}>
            <Head>
                <title>{params?.question?.title}</title>
            </Head>
            <Box display='flex' m={2}>
                <Vote votesTotal={post?.votesTotal} vote={type => vote(post?.id, type)}/>
                <Content html={post?.content}/>
            </Box>
            <QuestionFooter user={post?.user} tags={post?.tags}/>
            <Answers items={post?.answers} vote={vote}/>
            {
                user && <AnswerForm onSubmit={answer}/>
            }
        </MainLayout>
    )
}

function QuestionFooter({user, tags}) {
    return (
        <Box display="flex" m={2}>
            <Box flexGrow={1} display="flex">
                <Avatar>{user?.name?.charAt(0)}</Avatar>
                <Box marginY={'auto'} marginX={1}>
                    {user?.name}
                </Box>
            </Box>
            <Box marginY={'auto'} display="flex">
                <Tags items={tags}/>
            </Box>
        </Box>
    )
}

function Answer({data: {id, content, user, createdAt, votesTotal}, vote}) {
    return (
        <Box p={2}>
            <Box display="flex">
                <Vote votesTotal={votesTotal} vote={vote}/>
                <Content html={content}/>
            </Box>
            <Box display="flex" marginTop={2}>
                <Avatar>{user.name.charAt(0)}</Avatar>
                <Box marginY={'auto'} marginX={1} flexGrow={1}>
                    {user.name}
                </Box>
                <Typography variant="caption" display="block" marginY={'auto'}>
                    {moment(createdAt).fromNow()}
                </Typography>
            </Box>
        </Box>
    )
}

function Answers({items, vote}) {
    const classes = useStyles()
    return (
        <>
            <Box className={classes.answersTitle}>
                <Typography variant='h6'>
                    <FormattedMessage id='post.answers'/>
                </Typography>
            </Box>
            <Divider/>
            {
                items?.map(answer => {
                    return <>
                        <Answer data={answer} vote={type => vote(answer.id, type)}/>
                        <Divider/>
                    </>
                })
            }
        </>
    )
}

function AnswerForm({onSubmit}) {
    const classes = useStyles()
    const [content, setContent] = useState('')
    const handleSubmit = async () => {
        await onSubmit({content})
        setContent('')
    }
    return (
        <Box p={2} className={classes.answerForm}>
            <Box>
                <Editor onChange={setContent} content={content}/>
            </Box>
            <Button color="primary" variant="contained" onClick={handleSubmit}>
                <FormattedMessage id='btn.share'/>
            </Button>
        </Box>
    )
}

export async function getStaticPaths() {
    await dbConnect()
    const items = await Post.find({parent: null}).exec()
    const paths = items.map(e => ({params: {id: e.id.toString()}}))
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({params}) {
    await dbConnect()
    let item = await Post.findById(params.id).exec()
    return {
        props: {
            params: JSON.parse(JSON.stringify(item))
        }
    }
}
