import AppNavigation from '../components/AppNavigation'
import AppMainBody from '../components/AppMainBody'
import AppFooter from '../components/AppFooter'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)

const Index = () => {
  return (
    <div class="bg-gray-100 overflow-x-hidden">
      <AppNavigation/>

      <AppMainBody/>

      <AppFooter/>
    </div>
  )
}
export default Index
