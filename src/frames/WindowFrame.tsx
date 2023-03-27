import { Box, styled } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'
import { WindowFrameIProps } from '../WidgetBuilder.interface'

/**
 * Window Frame component Wrapper
 * @returns
 */
const WindowWrapper = styled(Box, { name: 'Widget_builder_Window_Wrapper' })(() => ({
    background: 'inherit'
}))

const WindowFrame: React.FC<WindowFrameIProps> = ({ children }) => {
    return (
        <WindowWrapper>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    scale: 1,
                    rotate: 0,
                    opacity: 1
                }}
            >
                {children}
            </motion.div>
        </WindowWrapper>
    )
}

export default WindowFrame
