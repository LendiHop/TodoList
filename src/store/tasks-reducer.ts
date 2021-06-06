import {TasksStateType} from "../App";
import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";

type removeTaskAT = {
    type: "REMOVE-TASK"
    todoListID: string
    taskID: string
}

type addTaskAT = {
    type: "ADD-TASK"
    title: string
    todoListID: string
}

type changeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    isDone: boolean
    taskID: string
    todoListID: string
}

type changeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    title: string
    taskID: string
    todoListID: string
}

export type ActionUnionType = removeTaskAT | addTaskAT | changeTaskStatusAT | changeTaskTitleAT | AddTodoListAT | RemoveTodoListAT;

export const tasksReducer = (state: TasksStateType, action: ActionUnionType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskID)
            };
        case "ADD-TASK":
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false};
            return {
                ...state,
                [action.todoListID]: [newTask, ...state[action.todoListID]]
            };
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {...t, isDone: action.isDone} : t)
            };
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {...t, title: action.title} : t)
            };
        case "ADD-TODOLIST": {
            const stateCopy = {...state};
            stateCopy[action.todoListId] = [];
            return stateCopy;
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.todoListID];
            return stateCopy;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskID: string, todoListID: string): removeTaskAT => {
    return {
        type: "REMOVE-TASK",
        todoListID,
        taskID
    }
}

export const addTaskAC = (title: string, todoListID: string): addTaskAT => {
    return {
        type: "ADD-TASK",
        title,
        todoListID,
    }
}

export const changeTaskStatusAC = (taskID: string,  isDone: boolean, todoListID: string): changeTaskStatusAT => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskID,
        isDone,
        todoListID,
    }
}

export const changeTaskTitleAC = (taskID: string,  title: string, todoListID: string): changeTaskTitleAT => {
    return {
        type: "CHANGE-TASK-TITLE",
        taskID,
        title,
        todoListID,
    }
}