import { useState } from 'react'
import useAuth from "hooks/useAuth"
import { MainLayout } from "layouts"
import { Box, Button, Grid } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import { useTags } from 'hooks/useTag'
import { ask as askApi } from 'hooks/usePost'
import { useRouter } from 'next/router'
import { TextInput, TagsInput, Editor } from 'components/inputs'

export default function Ask() {

    const router = useRouter()

    const { user } = useAuth({
        redirectTo: '/login', redirectIfFound: false
    })

    const { data: tagsList } = useTags()

    const [title, setTitle] = useState()
    const [tags, setTags] = useState([])
    const [content, setContent] = useState()

    const onSubmit = async event => {
        event.preventDefault()
        const data = {
            title,
            content,
            tags: tags.map(e => e.value)
        }
        const id = await askApi(data)
        router.push(`/question/${id}`)
    }

    return (
        <MainLayout title='title.ask'>
            <Box p={2}>
                <form onSubmit={onSubmit}>
                    <TextInput
                        variant="outlined"
                        name="title"
                        value={title}
                        onChange={setTitle}
                        label="input.title"
                        required
                        inputProps={{
                            autoComplete: 'off'
                        }}
                    />
                    <TagsInput
                        label='input.tags'
                        onChange={setTags}
                        value={tags}
                        options={tagsList.map(e => ({ label: e.name, value: e.id }))}
                    />
                    <Box marginBottom={2}>
                        {user && <Editor onChange={setContent} content={content} />}
                    </Box>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            <FormattedMessage id='btn.continue' />
                        </Button>
                    </Grid>
                </form>
            </Box>
        </MainLayout>
    )
}