import { Task } from "./Task";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Task Component',
    component: Task
}

const changeTaskStatusCallback = action("Status changed");
const changeTaskTitleCallback = action("Title changed");
const removeTaskCallback = action("Task removed");

export const TaskBaseExample = (props: any) => {
    return <>
        <Task removeTask={ removeTaskCallback } changeTaskStatus={ changeTaskStatusCallback } changeTaskTitle={ changeTaskTitleCallback } task={ { id: '1', isDone: false, title: 'React' } } todoListID={ 'todolist1' }/>
        <Task removeTask={ removeTaskCallback } changeTaskStatus={ changeTaskStatusCallback } changeTaskTitle={ changeTaskTitleCallback } task={ { id: '2', isDone: false, title: 'JS' } } todoListID={ 'todolist1' }/>
        <Task removeTask={ removeTaskCallback } changeTaskStatus={ changeTaskStatusCallback } changeTaskTitle={ changeTaskTitleCallback } task={ { id: '3', isDone: true, title: 'CSS' } } todoListID={ 'todolist1' }/>
    </>
}