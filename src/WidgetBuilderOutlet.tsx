import { Box, styled } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
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
            if (context.view !== null) {
                const arr = element
                if (context.view._remove) {
                    const i = element.findIndex((e) => e.path === context.view?.path)

                    if (i > -1) {
                        arr.splice(i, 1)
                    }

                    setElement([
                        ...arr.map((el: IWidgetBuilderRoute) => {
                            return el
                        })
                    ])
                } else {
                    setElement([
                        ...arr.map((el: IWidgetBuilderRoute) => {
                            return el
                        }),
                        context.view
                    ])
                }
            } else {
                setElement([])
            }
        }

        /**
         * However if regular then we want to only show a singular view
         */
        if (builder.type === 'window') {
            if (context.view !== null) setElement([context.view])
            else setElement([])
        }
    }, [context.view])

    if(builder.type === 'fragment'){
        let dv = document.createElement('div')
        dv.setAttribute('id', 'widget-builder-fragment')
        document.body.appendChild(dv)
        return ReactDOM.createPortal( <Wrapper name={builder.name}>
            {element.map((view) => {
                return !view._remove ? view.window : null
            })}
        </Wrapper>,
        document.getElementById('widget-builder-fragment') as HTMLElement)
    }

    return (
        <Wrapper name={builder.name}>
            {element.map((view) => {
                return !view._remove ? view.window : null
            })}
        </Wrapper>
    )
}
