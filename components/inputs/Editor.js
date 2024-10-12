import React, { useState, useEffect, useRef } from 'react'

export default function Editor({ onChange, content = '' }) {
    
    const editorRef = useRef()
    const [editorLoaded, setEditorLoaded] = useState(false)
    const {CKEditor, ClassicEditor} = editorRef.current || {}

    useEffect(() => {
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
        }
        setEditorLoaded(true)
    }, [])
    
    return editorLoaded ? (
        <CKEditor
           editor={ClassicEditor}
           config={{
               language: {
                   ui: 'ar',
                   content: 'ar',
               },
               minHeight: '300px'
           }}
           data={content}
           onChange={(event, editor) => {
                const data = editor.getData()
                onChange(data)
           }}
        />
    ) : (
        <div>Editor loading</div>
    )
}