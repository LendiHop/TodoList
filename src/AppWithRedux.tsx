import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux() {
    console.log("App");
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>( state => state.todoLists );
    const tasks = useSelector<AppRootStateType, TasksStateType>( state => state.tasks );

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID));
    }, [dispatch]);

    const addTask = useCallback((title: string, todoListID: string) => {

        dispatch(addTaskAC(title, todoListID));
    }, [dispatch]);

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(changeTodoListTitleAC(title, todoListID));
    }, [dispatch]);

    const changeStatus = useCallback((taskID: string, newIsDoneValue: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, newIsDoneValue, todoListID));
    }, [dispatch]);

    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatch(changeTodoListFilterAC(value, todoListID));
    }, [dispatch]);

    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, newTitle, todoListID));
    }, [dispatch]);

    const removeTodoList = useCallback((todoListID: string) => {
        const action = removeTodoListAC(todoListID);
        dispatch(action);
    },[dispatch]);

    const addTodoList = useCallback((title: string) => {
        const action = addTodoListAC(title);
        dispatch(action);
    }, [dispatch]);

    const getTasksForTodoList = useCallback((todoLists: TodoListType) => {
        switch (todoLists.filter) {
            case "active":
                return tasks[todoLists.id].filter(t => !t.isDone);
            case "completed":
                return tasks[todoLists.id].filter(t => t.isDone);
            default:
                return tasks[todoLists.id];
        }
    }, [tasks]);

    const todoListsComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper style={ {padding: "10px"} }>
                    <Todolist title={tl.title}
                              tasks={getTasksForTodoList(tl)}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={tl.filter}
                              todoListID={tl.id}
                              key={tl.id}
                              removeTodoList={removeTodoList}
                              changeTaskTitle={changeTaskTitle}
                              changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    });

    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        News
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={ {padding: "20px"} }>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}
