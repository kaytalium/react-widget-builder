import { Box, styled } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import useWidgetBuilderNavigation from './useWidgetBuilderNavigation'
import { IWidgetBuilderRoute, WidgetBuilderOutletIProps } from './WidgetBuilder.interface'
import WidgetBuilderProvider, { WidgetBuilderContext } from './WidgetBuilderContext'

const Wrapper = styled(Box, { name: 'Outlet_wrapper' })<{ name: string | undefined | null }>(({ name }) => ({
    name: name
}))

export const WidgetBuilderOutlet = (props: WidgetBuilderOutletIProps) => {
    const { builder, onNavigate } = props

    return (
        <WidgetBuilderProvider className='WidgetBuilderProvider-wrapper'>
            <Component builder={builder} onNavigate={onNavigate} />
        </WidgetBuilderProvider>
    )
}

const Component: React.FC<WidgetBuilderOutletIProps> = ({ builder, onNavigate }) => {
    const context = useContext(WidgetBuilderContext)
    const { navigate } = useWidgetBuilderNavigation()
    const [element, setElement] = useState<IWidgetBuilderRoute[]>([])

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
            console.log('Fragment to be removed from view: ', context.view)
            if (context.view !== null) {
                setElement([
                    ...element.map((el: IWidgetBuilderRoute) => {
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
            if (context.view !== null) setElement([context.view])
        }
    }, [context.view])

    return (
        <Wrapper name={builder.name}>
            {element.map((view) => {
                return !view._remove ? view.window : null
            })}
        </Wrapper>
    )
}
