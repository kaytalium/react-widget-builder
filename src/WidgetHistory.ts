import { IWidgetBuilderRoute } from './WidgetBuilder.interface'

export interface IHistoryInterface {
    view: IWidgetBuilderRoute | null
    params?: any
}
export class WidgetHistory {
    private _history: IHistoryInterface[] = []

    add(item: IHistoryInterface) {
        this._history.push(item)
    }

    get lastView(): IHistoryInterface | undefined {
        return this._history.pop()
    }
}
