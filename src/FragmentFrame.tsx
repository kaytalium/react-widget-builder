import { Box, IconButton, styled } from '@mui/material'
import { motion } from 'framer-motion'
import React, { useContext } from 'react'
import useWidgetBuilderNavigation from './useWidgetBuilderNavigation'
import { FragmentFrameIProps } from './WidgetBuilder.interface'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { WidgetBuilderContext } from './WidgetBuilderContext'

/**
 * Fragment Frame component Wrapper
 * @returns
 */
const FragmentWrapper = styled(Box, { name: 'Fragment_Wrapper' })({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: '1000',
    background: '#fff',
    overflow: 'hidden'
})

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

const FragmentFrame: React.FC<FragmentFrameIProps> = ({ children }) => {
    const { navigateBack } = useWidgetBuilderNavigation()
    const { fragmentHeader } = useContext(WidgetBuilderContext)

    return (
        <FragmentWrapper>
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
                    <IconButton aria-label='edit' size='small' onClick={navigateBack}>
                        <ArrowBackIcon fontSize='inherit' />
                    </IconButton>
                    <FragmentTitle>{fragmentHeader}</FragmentTitle>
                </FragmentHeader>
                <FragmentBody>{children}</FragmentBody>
            </motion.div>
        </FragmentWrapper>
    )
}

export default FragmentFrame