import React, {useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    filter: FilterValuesType
    todoListID: string
    removeTodoList: (todoListID: string) => void
    removeTask: (taskId: string, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {
    console.log("Todolist");
    const {
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        filter,
        todoListID,
        removeTodoList,
        changeTaskTitle,
        changeTodoListTitle,
    } = props;

    const onClickRemoveTodoList = useCallback(() => removeTodoList(todoListID), [removeTodoList, todoListID]);

    const onAllClickHandler = useCallback(() => changeFilter("all", todoListID), [changeFilter, todoListID]);
    const onActiveClickHandler = useCallback(() => changeFilter("active", todoListID), [changeFilter, todoListID]);
    const onCompletedClickHandler = useCallback(() => changeFilter("completed", todoListID), [changeFilter, todoListID]);

    const onAddTask = useCallback((title: string) => addTask(title, todoListID), [addTask, todoListID]);

    const onChangeTodoListTitle = useCallback((title: string) => changeTodoListTitle(title, todoListID), [changeTodoListTitle, todoListID]);

    return <div>
        <h3>
            <EditableSpan title={title} changeTitle={onChangeTodoListTitle}/>
            <IconButton onClick={onClickRemoveTodoList}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={onAddTask}/>
        <ol>
            {
                tasks.map(t => <Task removeTask={removeTask} changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle} task={t} todoListID={todoListID} key={t.id}/>)
            }
        </ol>
        <div>
            <Button variant={filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>All</Button>
            <Button color={"primary"} variant={filter === "active" ? "contained" : "text"} onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={"secondary"} variant={filter === "completed" ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
});

