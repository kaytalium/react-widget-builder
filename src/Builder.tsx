import React from 'react'
import { v4 } from 'uuid'
import FragmentFrame from './frames/FragmentFrame'
import WindowFrame from './frames/WindowFrame'
import { IWidgetBuilderNavigate, IWidgetBuilderRoute, WidgetBuilderArgs, WindowType } from './WidgetBuilder.interface'

export class WidgetBuilder {
    private _routes: IWidgetBuilderRoute[] = []
    private _name: string | null
    private _type: WindowType = 'window'
    private _urlHash = false

    constructor(args: WidgetBuilderArgs) {
        // console.log('new WidgetBuilder input: ', args)
        this._routes = args.routes
        this._name = args.name || null
        this._type = args.type || 'window'
        this._urlHash = args.urlHash || false

        if (this._routes !== undefined) {
            /**
             * We can now wrap the views with the appropriate frame
             */

            if (this._type === 'fragment') {
                this._assignWrapper((route, index) => {
                    const order = route.order ?? index
                    route._remove = false
                    route.window = (
                        <FragmentFrame key={v4()} order={order} {...route.fragmentHeaderOptions}>
                            {route.window}
                        </FragmentFrame>
                    )
                    return route
                })
            }

            /**
             * if the type is window then we add all view a window frame
             *
             */
            if (this._type === 'window') {
                this._assignWrapper((route) => {
                    route._remove = false
                    route.window = <WindowFrame key={v4()}>{route.window}</WindowFrame>
                    return route
                })
            }
        }
    }

    /**
     * Private functions
     */
    private _assignWrapper(callback: (route: IWidgetBuilderRoute, index?: number) => IWidgetBuilderRoute) {
        this._routes = this._routes.map((route, index) => {
            return callback(route, index)
        })
    }

    //

    /**
     * Getters & Setters
     */
    get view() {
        return this._routes[0].window
    }

    get name() {
        return this._name
    }

    get route() {
        return this._routes
    }

    get type() {
        return this._type
    }

    get urlHash() {
        return this._urlHash
    }

    public activeDefaultView(): IWidgetBuilderRoute | null {
        if (this._routes !== undefined) {
            const i = this._routes.findIndex((e: any) => {
                return Object.prototype.hasOwnProperty.call(e, 'index')
            })
            if (i > -1) {
                return this._routes[i]
            } else {
                return null
            }
        }
        return null
    }

    public getWindow(target: IWidgetBuilderNavigate | null): IWidgetBuilderRoute | null {
        const i = this._routes.findIndex((e) => {
            return e.path === target?.path
        })
        if (i > -1) {
            return this._routes[i]
        } else {
            return null
        }
    }
}
