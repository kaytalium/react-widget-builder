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
    zIndex: order !== undefined ? 1000 + order : '1000',
    background: '#fff',
    overflow: 'hidden'
}))

const FragmentTitle = styled(Box, { name: 'Fragment_Header' })({
    padding: '0 16px',
    fontSize: '11pt',
    display: 'flex',
    alignItems: 'center'
})

const FragmentHeader = styled(Box, { name: 'Fragment_Header' })({
    padding: '8px 16px',
    display: 'flex',
    flexDirection: 'row'
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
                    {!isBackNav ? null : (
                        <IconButton aria-label='edit' size='small' onClick={navigateBack}>
                            <ArrowBackIcon fontSize='inherit' />
                        </IconButton>
                    )}

                    <FragmentTitle>{header}</FragmentTitle>
                </FragmentHeader>
                <FragmentBody>{children}</FragmentBody>
            </motion.div>
        </FragmentWrapper>
    )
}

export default FragmentFrame
