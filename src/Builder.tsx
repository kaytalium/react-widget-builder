
import React from 'react'
import FragmentFrame from './FragmentFrame'
import { IWidgetBuilderNavigate, IWidgetBuilderRoute } from './WidgetBuilder.interface'




type WindowType = 'window' | 'fragment' | 'panel' | 'section'
interface WidgetBuilderArgs {
    name?: string
    routes: IWidgetBuilderRoute[]
    type?: WindowType
}
export class WidgetBuilder {
    private _routes: IWidgetBuilderRoute[] = []
    private _name: string | null
    private _type: WindowType = 'window'

    constructor(args: WidgetBuilderArgs) {
        // console.log('new WidgetBuilder input: ', args)
        this._routes = args.routes
        this._name = args.name || null
        this._type = args.type || 'window'

        if (this._routes !== undefined) {
            /**
             * We can now wrap the views with the appropriate frame
             */

            if (this._type === 'fragment') {
                this._routes = this._routes.map((route) => {
                    route.window = <FragmentFrame>{route.window}</FragmentFrame>
                    return route
                })
            }
        }
    }
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