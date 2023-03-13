import { useContext } from 'react'
import { IWidgetBuilderNavigate } from './WidgetBuilder.interface'
import { WidgetBuilderContext } from './WidgetBuilderContext'

export default function useWidgetBuilderNavigation() {
    // const [nav, navigate] = useState<IWidgetBuilderNavigate>({path: ""})
    const context = useContext(WidgetBuilderContext)

    // useEffect(()=>{
    //     console.log("Next Navigation: ",nav);

    //     context.nextNav(nav)

    // },[nav])

    const navigate = (e: IWidgetBuilderNavigate) => {
        context.nextNav(e)
    }

    const navigateBack = () => {
        // use the history object to go back to the previous screen
        context.goBack()
    }

    return { navigate, navigateBack }
}
