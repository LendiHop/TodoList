import React, {useCallback, useEffect} from 'react'
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    createStyles,
    LinearProgress,
    makeStyles,
    Toolbar,
    Typography
} from '@material-ui/core'
import {TodolistsList} from '../features/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useSelector} from 'react-redux'
import {appActions} from '../features/Application'
import {Route} from 'react-router-dom'
import {authActions, authSelectors, Login} from '../features/Auth'
import {selectIsInitialized, selectStatus} from '../features/Application/selectors'
import {useActions} from '../utils/redux-utils'

const useStyles = makeStyles(() =>
    createStyles({
        title: {
            flexGrow: 1,
        },
    }),
);

function App() {
    const classes = useStyles();
    const status = useSelector(selectStatus)
    const isInitialized = useSelector(selectIsInitialized)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)

    const {logout} = useActions(authActions)
    const {initializeApp} = useActions(appActions)
    useEffect(() => {
        if (!isInitialized) {
            initializeApp()
        }
    }, []);

    const logoutHandler = useCallback(() => {
        logout()
    }, [])
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Todolist
                    </Typography>
                    {isLoggedIn &&
                    <Button variant="outlined" color="secondary" onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>
            <Container fixed>
                <Route exact path={'/'} render={() => <TodolistsList demo={false}/>}/>
                <Route path={'/login'} render={() => <Login/>}/>
            </Container>
        </div>
    )
}

export default App
