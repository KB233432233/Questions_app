import { FormattedMessage, useIntl } from 'react-intl'
import axios from 'axios'
import router from 'next/router'


export default function Home() {
    const { formatMessage } = useIntl()
    const register = () => {
        router.push('/register')
    }

    return (
        <h1>
            <FormattedMessage id='hello' defaultMessage={'default message'} />
            {
                formatMessage({ id: 'hello' })
            }
            <button onClick={register}>register</button>
        </h1>
    )
}
