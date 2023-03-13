# react-widget-builder

React widget builder is a small light weight UI component widget that is use to contain componants that can share data between the components outside of the default router.


Install: 
```diff
$ npm i @knymbus/react-widget-builder
```

Usage:

```ts
import { 
    WidgetBuilder, 
    WidgetBuilderOutlet, 
    IWidgetBuilderRoute } from "@knymbus/react-widget-builder";

import WindowOne from "./WindowOne"
import WindowTwo from "./WindowTwo"

export default function MyComponent(props: IProps){
    const widgetRoutes: IWidgetBuilderRoute[] = [
        {
            index: true,
            path: "window-1",
            window: <WindowOne />,
            transition: true
        },
        {
            path: "window-2",
            window: <WindowTwo  />,
            transition: true
        }
    ]

    const myWidgetBuilder = new WidgetBuilder({
            name: "My Widget Name",
            routes: widgetRoutes
        })

        return (
            <div>
                <WidgetBuilderOutlet builder={myWidgetBuilder} /> 
            </div>
        )
}

```
