import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    removeTask: (taskId: string, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    task: TaskType
    todoListID: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const {
        removeTask,
        changeTaskStatus,
        changeTaskTitle,
        task,
        todoListID,
    } = props;

    const onClickHandler = () => removeTask(task.id, todoListID);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue, todoListID);
    };

    const onChangeTaskTitle = useCallback((title: string) => {
        changeTaskTitle(task.id, title, todoListID);
    }, [changeTaskTitle, task.id, todoListID]);

    return <li key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox onChange={onChangeHandler} checked={task.isDone}/>
        <EditableSpan title={task.title} changeTitle={onChangeTaskTitle}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </li>
});