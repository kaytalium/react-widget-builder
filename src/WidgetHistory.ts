import { IHistoryInterface } from './WidgetBuilder.interface'


export class WidgetHistory {
    private _history: IHistoryInterface[] = []

    add(item: IHistoryInterface) {
        this._history.push(item)
    }

    get currentView(): IHistoryInterface | undefined {
        return this._history.pop()
    }
}
