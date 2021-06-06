import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todoListId: string
}

type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    todoListID: string
}

type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    todoListID: string
}

export type ActionUnionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT;

export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionUnionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID);
        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {
                id: action.todoListId,
                title: action.title,
                filter: "all"
            };
            return [...todoLists, newTodoList];
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl);
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl);
        default:
            return todoLists;
    }
}

export const removeTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return {
        type: "REMOVE-TODOLIST",
        todoListID: todoListID
    }
}

export const addTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todoListId: v1()
    }
}

export const changeTodoListTitleAC = (todoListID: string, title: string): ChangeTodoListTitleAT => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todoListID: todoListID,
        title: title
    }
}

export const changeTodoListFilterAC = (todoListID: string, filter: FilterValuesType): ChangeTodoListFilterAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todoListID: todoListID,
        filter: filter
    }
}