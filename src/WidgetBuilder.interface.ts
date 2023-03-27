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
    /**
     * Private objects
     */
    _remove?: boolean

}

/**
 * The window type list the different types of window the builder will handle for you
 *
 * @description window - main
 * @description fragment - stack view
 * @description panel - partial view
 * @description section - this is a child of all the other 3 options
 */
export type WindowType = 'window' | 'fragment' | 'panel' | 'section'

export interface WidgetBuilderArgs {
    /**
     * Give the builder a name to easily find the outlet in the dom
     */
    name?: string
    /**
     * List of routes and their property settings
     */
    routes: IWidgetBuilderRoute[]
    /**
     * The builder manage different types of view container that have different behaviour
     * @default window
     * @description window this is the base type that is a master view that only show one view at a time
     * @description fragment - This is the stack view that allow the user to stack view on top of each other
     */
    type?: WindowType
    /**
     * this option allow the user to use the hash from the current url
     */
    urlHash?: boolean
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

export interface WindowFrameIProps {
    children: any
}

export interface WidgetBuilderContextInterface {
    nextView: (e: IWidgetBuilderRoute) => void
    view: IWidgetBuilderRoute | null
    nextNav: (e: any) => void
    Builder: (e: any) => void
    goBack: () => void
    fragmentHeader: string | ReactNode
    params: any
    setFragmentHeader: (e: string | ReactNode) => void
}


export interface IHistoryInterface {
    view: IWidgetBuilderRoute | null
    params?: any
}