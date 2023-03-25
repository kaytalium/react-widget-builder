import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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
    const location = useLocation()

    useEffect(() => {
        context.Builder(builder)
    }, [builder])

    useEffect(() => {
        // console.log('onNavigate object called', onNavigate)
        if (onNavigate !== undefined) {
            navigate(onNavigate)
        }
    }, [onNavigate])

    // using url Hash
    useEffect(() => {
        if(builder.urlHash){
            let hash = location.hash
            navigate({
                path: hash
            })
        }
    }, [location])

    return <>{context.view}</>
}
