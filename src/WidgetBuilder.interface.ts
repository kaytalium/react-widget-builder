import { ReactNode } from 'react'
import { WidgetBuilder } from './Builder'

export interface IWidgetBuilderRoute {
    /**
     * Path name for a given view
     */
    path: string
    /**
     * index indicates the default view that the widget should show.
     * if index is not found in the list of view then the first view
     * will be shown
     */
    index?: boolean
    /**
     * This is the React node component that you wish to display for a
     * given path
     */
    window: ReactNode
    /**
     * Context is used to share information between windows.
     * Once a window is routed to that window is no-longer active or in memory
     * therefore, if you need nformation to be share with other window you
     * can use this context attribute
     */
    context?: any
    /**
     * The Transition attributes indicate how the window should enter and exit the active window state
     */
    transition?: boolean
    /**
     * If using a fragment you can set the order of the fragment to show based on your fragment flow
     */
    order?: number
}

export interface IWidgetBuilderNavigate {
    path: string
    params?: any
}

export interface WidgetBuilderOutletIProps {
    builder: WidgetBuilder
    onNavigate?: IWidgetBuilderNavigate
}

export interface FragmentFrameIProps {
    children: any
    order?: number
}

export interface WidgetBuilderContextInterface {
    nextView: (e: any) => void
    view: ReactNode
    nextNav: (e: any) => void
    Builder: (e: any) => void
    goBack: () => void
    fragmentHeader: string | ReactNode
    params: any
    setFragmentHeader: (e: string | ReactNode) => void
}
