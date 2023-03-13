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
