import { Box, IconButton, styled } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { IWidgetBuilderNavigate, IWidgetBuilderRoute } from './WidgetBuilder.interface'
import WidgetBuilderProvider, { WidgetBuilderContext } from './WidgetBuilderContext'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { motion } from 'framer-motion'
import useWidgetBuilderNavigation from './useWidgetBuilderNavigation'

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

export const WidgetBuilderOutlet = (props: { builder: WidgetBuilder; onNavigate?: IWidgetBuilderNavigate }) => {
    const { builder, onNavigate } = props

    return (
        <WidgetBuilderProvider>
            <Component builder={builder} onNavigate={onNavigate} />
        </WidgetBuilderProvider>
    )
}

interface IProps {
    builder: WidgetBuilder
    onNavigate?: IWidgetBuilderNavigate
}

const Component: React.FC<IProps> = ({ builder, onNavigate }) => {
    const context = useContext(WidgetBuilderContext)
    const { navigate } = useWidgetBuilderNavigation()
    useEffect(() => {
        context.Builder(builder)
    }, [builder])

    useEffect(() => {
        // console.log('onNavigate object called', onNavigate)
        if (onNavigate !== undefined) {
            navigate(onNavigate)
        }
    }, [onNavigate])

    return <>{context.view}</>
}

/**
 * Fragment Frame component Wrapper
 * @returns
 */

const FragmentWrapper = styled(Box, { name: 'Fragment_Wrapper' })({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: '9999999999999999999999',
    background: '#fff',
    overflow: 'hidden'
})

const FragmentTitle = styled(Box, { name: 'Fragment_Header' })({
    padding: '0 16px',
    fontSize: '11pt',
    display: 'flex',
    alignItems: 'center'
})

const FragmentHeader = styled(Box, { name: 'Fragment_Header' })({
    padding: '8px 16px',
    display: 'flex',
    flexDirection: 'row'
})
const FragmentBody = styled(Box, { name: 'Fragment_Body' })({
    padding: '8px 16px',
    height: 'calc(100vh - 60px)',
    overflow: 'hidden',
    overflowY: 'auto'
})

interface FragmentFrameIProps {
    children: any
}
const FragmentFrame: React.FC<FragmentFrameIProps> = ({ children }) => {
    const { navigateBack } = useWidgetBuilderNavigation()
    const { fragmentHeader } = useContext(WidgetBuilderContext)

    return (
        <FragmentWrapper>
            <motion.div
                initial={{ opacity: 0, x: -1000 }}
                animate={{
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0,
                    opacity: 1
                }}
            >
                <FragmentHeader>
                    <IconButton aria-label='edit' size='small' onClick={navigateBack}>
                        <ArrowBackIcon fontSize='inherit' />
                    </IconButton>
                    <FragmentTitle>{fragmentHeader}</FragmentTitle>
                </FragmentHeader>
                <FragmentBody>{children}</FragmentBody>
            </motion.div>
        </FragmentWrapper>
    )
}
