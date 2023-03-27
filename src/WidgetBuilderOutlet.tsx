import { Box } from '@mui/material'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { v4 } from 'uuid'
import useWidgetBuilderNavigation from './useWidgetBuilderNavigation'
import { WidgetBuilderOutletIProps } from './WidgetBuilder.interface'
import WidgetBuilderProvider, { WidgetBuilderContext } from './WidgetBuilderContext'

export const WidgetBuilderOutlet = (props: WidgetBuilderOutletIProps) => {
    const { builder, onNavigate } = props

    return (
        <WidgetBuilderProvider>
            <Component builder={builder} onNavigate={onNavigate} />
        </WidgetBuilderProvider>
    )
}

const Component: React.FC<WidgetBuilderOutletIProps> = ({ builder, onNavigate }) => {
    const context = useContext(WidgetBuilderContext)
    const { navigate } = useWidgetBuilderNavigation()
    const [element, setElement] = useState<ReactNode[]>([])

    useEffect(() => {
        context.Builder(builder)
    }, [builder])

    useEffect(() => {
        // console.log('onNavigate object called', onNavigate)
        if (onNavigate !== undefined) {
            navigate(onNavigate)
        }
    }, [onNavigate])

    useEffect(() => {
        /**
         * Here im saying that if the builder is building fragments then we show
         * fragments by the order in which they come
         */
        if (builder.type === 'fragment') {

            if(context.view !== null){
                setElement([
                    ...element.map((el) => {
                        return el
                    }),
                    context.view
                ])
            }
        }

        /**
         * However if regular then we want to only show a singular view
         */
        if (builder.type === 'window') {
            setElement([context.view])
        }
    }, [context])

    return (
        <Box key={v4()}>
            {element.map((view) => {
                return view
            })}
        </Box>
    )
}
