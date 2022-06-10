import {combineReducers} from "redux"

import {users_reducer} from "./users_reducer"
import {category_reducer} from "./category_reducer"
import {item_reducer} from "./item_reducer"
import { search_reducer } from "./search_reducer"
import {comment_reducer} from "./comment_reducer"
import { order_reducer } from "./order_reducer"

export default combineReducers({
    user: users_reducer,
    category: category_reducer,
    item: item_reducer,
    search: search_reducer,
    comment: comment_reducer,
    order:order_reducer
})

