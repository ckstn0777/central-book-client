import { css, Global } from '@emotion/react'
import { Switch, Route, useHistory } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Auth from './pages/Auth'
import DebugObserver from './components/DebugObserver'
import { useEffect } from 'react'
import { useUserState } from './atoms/authState'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import media from './lib/styles/media'
import MobileFooter from './components/MobileFooter'
import MobileHeader from './components/MobileHeader'
import useAuth from './hooks/useAuth'
import userStorage from './lib/storage/userStorage'
import useFirebasePageViewEffect from './hooks/useFirebasePageViewEffect'
import loadable from '@loadable/component'

const AuthPage = loadable(() => import('./pages/Auth'))
const RegisterPage = loadable(() => import('./pages/Register'))
const ShelvePage = loadable(() => import('./pages/Shelve'))
const ExplorePage = loadable(() => import('./pages/Explore'))
const ExploreBookPage = loadable(() => import('./pages/Explore/ExploreBook'))
const SettingPage = loadable(() => import('./pages/Setting'))
const AnalysisPage = loadable(() => import('./pages/Analysis'))

function App() {
  const [, setUser] = useUserState()
  const { logout } = useAuth()
  const history = useHistory()

  useFirebasePageViewEffect()
  useEffect(() => {
    const user = userStorage.get()

    if (user) {
      setUser(user)
    } else {
      history.replace('/')
    }
  }, [setUser, history])

  return (
    <div css={AppStyle}>
      <DebugObserver />
      <Switch>
        <Route path="/" component={AuthPage} exact>
          <Auth />
        </Route>
        <Route path="/register" component={RegisterPage} />
        <AppLayout>
          <MobileHeader />
          <AppLayout.Sidebar logout={logout} />
          <AppLayout.Main>
            <Route path={`/:username/shelve/`} component={ShelvePage} />
            <Route path={`/:username/setting/`} component={SettingPage} />
            <Route path="/explore" component={ExplorePage} exact />
            <Route path={`/explore/book/:bookId`} component={ExploreBookPage} />
            <Route path="/chart" component={AnalysisPage} />
          </AppLayout.Main>
          <MobileFooter />
        </AppLayout>
      </Switch>
      <ToastContainer />
      <Global styles={GlobalStyle} />
    </div>
  )
}

const GlobalStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');

  * {
    margin: 0;
    padding: 0;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    // font-size: 62.5%; // 1rem = 10px
    font-size: 80%;

    ${media.xlarge} {
      font-size: 75%;
    }

    ${media.medium} {
      font-size: 70%;
    }
  }

  body {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    line-height: 1.6;
    background-color: #f6faff;
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
    /* ${media.medium} {
      margin-bottom: 8rem;
    } */
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`

const AppStyle = css`
  min-height: 100vh;
  /* background: black; */
`

export default App
