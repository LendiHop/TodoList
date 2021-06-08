import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export function AppWithReducers() {
    const todoListID_1 = v1(), todoListID_2 = v1();

    const [todoLists, dispatchToTodoListsReducer] = useReducer(todoListsReducer,[
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ]);
    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,{
        [todoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Bacon", isDone: false},
        ]
    });

    function removeTask(taskID: string, todoListID: string) {
        dispatchToTasksReducer(removeTaskAC(taskID, todoListID));
    }

    function addTask(title: string, todoListID: string) {

        dispatchToTasksReducer(addTaskAC(title, todoListID));
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        dispatchToTodoListsReducer(changeTodoListTitleAC(title, todoListID));
    }

    function changeStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        dispatchToTasksReducer(changeTaskStatusAC(taskID, newIsDoneValue, todoListID));
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        dispatchToTodoListsReducer(changeTodoListFilterAC(value, todoListID));
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        dispatchToTasksReducer(changeTaskTitleAC(taskID, newTitle, todoListID));
    }

    function removeTodoList(todoListID: string) {
        const action = removeTodoListAC(todoListID);
        dispatchToTasksReducer(action);
        dispatchToTodoListsReducer(action);
    }

    function addTodoList(title: string) {
        const action = addTodoListAC(title);
        dispatchToTasksReducer(action);
        dispatchToTodoListsReducer(action);
    }

    function getTasksForTodoList(todoLists: TodoListType) {
        switch (todoLists.filter) {
            case "active":
                return tasks[todoLists.id].filter(t => t.isDone === false);
            case "completed":
                return tasks[todoLists.id].filter(t => t.isDone === true);
            default:
                return tasks[todoLists.id];
        }
    }

    const todoListsComponents = todoLists.map(tl => {
        return (
            <Grid item>
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
