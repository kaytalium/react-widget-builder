import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { WidgetBuilder } from './Builder'
import { WidgetHistory } from './WidgetHistory'
import { IWidgetBuilderNavigate, IWidgetBuilderRoute, WidgetBuilderContextInterface } from './WidgetBuilder.interface'

export const WidgetBuilderContext = createContext<WidgetBuilderContextInterface>({
    nextView: (e: any) => {
        console.log(e)
    },
    view: null,
    nextNav: (e: any) => {
        console.log(e)
    },
    Builder: (e: any) => {
        console.log('This is my default function: ', e)
    },
    params: {},
    goBack: () => {
        console.log('goback init')
    }
})

export const useWidgetBuilderParams = () => {
    return useContext(WidgetBuilderContext).params
}

export default function WidgetBuilderProvider(props: any) {
    const [view, nextView] = useState<any>(null)
    const [nav, nextNav] = useState<IWidgetBuilderNavigate | null>(null)
    const [myBuilder, Builder] = useState<WidgetBuilder | null>(null)
    const [params, setParams] = useState()
    const { children } = props

    const widgetHistory = useMemo(() => new WidgetHistory(), [])

    const setDefault = useCallback(() => {
        // console.log('Default called with builder object: ', myBuilder)
        if (myBuilder !== null) {
            // console.log('We have a builder object>>>>>>', myBuilder)
            if (myBuilder.route.length > 0) {
                // console.log("myBuilder.route.length>>>>>", myBuilder.route.length);
                return {
                    nextView: myBuilder.activeDefaultView(),
                    view: myBuilder.activeDefaultView()
                }
                // nextView()
                // widgetHistory.add({ view:  })
            }
        }
        return {
            nextView: null,
            view: null
        }
    }, [myBuilder])

    useEffect(() => {
        // console.log('Global Builder context provider call onContext>>>>', myBuilder)
        if (myBuilder?.type !== 'fragment') {
            const defaultValues = setDefault()
            // console.log('Data from seDefault view ', defaultValues)
            if (view === null && defaultValues.view !== null) {
                nextView(defaultValues.view)
                widgetHistory.add({ view: defaultValues.view })
            }
        }
    }, [myBuilder])

    useEffect(() => {
        // console.log('Nav called inside provider: >>>>>> ', nav)
        if (nav?.path.length === 0 && myBuilder?.type !== 'fragment') {
            const defaultValues = setDefault()
            if (view === null && defaultValues.view !== null) {
                nextView(defaultValues.nextView)
                widgetHistory.add({ view: defaultValues.view })
            }
        } else {
            const w: IWidgetBuilderRoute | null = myBuilder?.getWindow(nav) || null

            if (w === null) {
                nextView(null)
            } else {
                nextView(w)
                setParams(nav?.params)
                widgetHistory.add({
                    view: w,
                    params: nav?.params
                })
            }
        }
    }, [nav])

    const goBack = () => {
        const currentView = widgetHistory.currentView

        if (currentView !== undefined && currentView !== null) {
            // We need to set the _remove attribut on the object before it goes to the
            // the view window
            const v: any = { ...currentView.view, _remove: true }

            nextView(v)
            setParams(currentView?.params)
        } else {
            nextView(null)
        }
    }

    return (
        <WidgetBuilderContext.Provider value={{ nextView, view, Builder, nextNav, params, goBack }}>
            {children}
        </WidgetBuilderContext.Provider>
    )
}
