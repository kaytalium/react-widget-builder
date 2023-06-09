import { Box, IconButton, styled } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'
import useWidgetBuilderNavigation from '../useWidgetBuilderNavigation'
import { FragmentFrameIProps } from '../WidgetBuilder.interface'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

/**
 * Fragment Frame component Wrapper
 * @returns
 */
const FragmentWrapper = styled(Box, { name: 'Fragment_Wrapper' })<{ order: number | undefined }>(({ order }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: order !== undefined ? 1100 + order : '1100',
    background: '#fff',
    overflow: 'hidden'
}))

const FragmentTitle = styled(Box, { name: 'Fragment_Title' })({
    padding: '0 16px',
    fontSize: '11pt',
    display: 'flex',
    alignItems: 'center'
})

const FragmentHeader = styled(Box, { name: 'Fragment_Header' })({
    padding: '8px 16px',
    display: 'flex',
    flexDirection: 'row',
    height: '1.7em'
})

const FragmentHeaderBackNav = styled(Box, { name: 'Fragment_Back_Nav' })({
    width: '1.6em',
    height: '1.6em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
})
const FragmentBody = styled(Box, { name: 'Fragment_Body' })({
    padding: '8px 16px',
    height: 'calc(100vh - 60px)',
    overflow: 'hidden',
    overflowY: 'auto'
})

const FragmentFrame: React.FC<FragmentFrameIProps> = ({ children, order, header, isBackNav }) => {
    const { navigateBack } = useWidgetBuilderNavigation()

    return (
        <FragmentWrapper order={order}>
            <motion.div
                initial={{ opacity: 0, x: -1000 }}
                animate={{
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0,
                    opacity: 1
                }}
            >
                <FragmentHeader>
                    <FragmentHeaderBackNav>
                        {isBackNav ? (
                            <IconButton aria-label='edit' size='small' onClick={navigateBack}>
                                <ArrowBackIcon fontSize='inherit' />
                            </IconButton>
                        ) : null}
                    </FragmentHeaderBackNav>

                    <FragmentTitle>{header}</FragmentTitle>
                </FragmentHeader>
                <FragmentBody>{children}</FragmentBody>
            </motion.div>
        </FragmentWrapper>
    )
}

export default FragmentFrame
