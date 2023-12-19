import { Box, Button, Container } from '@mantine/core'
import { LayoutComponent } from 'types/layout'
import Fluid from 'views/layout/Fluid'
import { Link } from 'react-router-dom'
import Error403 from '../../../assets/images/403-error.png'
import Error404 from '../../../assets/images/404-error.png'

type Props = {
    code: number
}

const Error: LayoutComponent<Props> = ({ code }) => {
    const imgSrc = () => {
        switch (code) {
            case 403:
                return Error403
            default:
                return Error404
        }
    }

    return (
        <Container>
            <Box style={{
                backgroundImage: `url(${imgSrc()})`,
                height: '100vh',
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'end'
            }}>
                <Button component={Link} to={'/'} mb='30px'>Back to Home</Button>
            </Box>
        </Container>
    )
}

Error.layout = Fluid
Error.displayName = 'Page.Error'

export default Error