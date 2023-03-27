import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { WidgetBuilderOutlet, WidgetBuilder } from '../src'

describe('Common render', () => {
    it('renders without crashing', () => {
        const builder = new WidgetBuilder({
            name: 'main window',
            routes: [
                {
                    index: true,
                    path: 'init',
                    window: <div>Hello Widget</div>
                }
            ]
        })
        render(<WidgetBuilderOutlet builder={builder} />)
    })
})

describe('Testing the Fragment option', () => {
    it('one child fragment', () => {
        const builder = new WidgetBuilder({
            type: 'fragment',
            name: 'fragment',
            routes: [
                {
                    path: 'route1',
                    window: <div>Fragment 1</div>
                }
            ]
        })
        render(<WidgetBuilderOutlet builder={builder} />)
    })

    it('trigger fragment', () => {
        const myNavigate = { path: 'r1' }
        const builder = new WidgetBuilder({
            type: 'fragment',
            name: 'fragment',
            routes: [
                {
                    path: 'r1',
                    window: <div>Fragment 1</div>
                },
                {
                    path: 'r2',
                    window: <div>Fragment 2</div>
                }
            ]
        })
        render(<WidgetBuilderOutlet builder={builder} onNavigate={myNavigate} />)
    })
})
