import { Application } from '@hotwired/stimulus'
import NavigationController from './navigation_controller'
import DownloadController from './download_controller'
import SelectionController from './selection_controller'

const application = Application.start()
application.register('navigation', NavigationController)
application.register('download', DownloadController)
application.register('selection', SelectionController)


export default application 