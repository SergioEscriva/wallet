from fastapi import APIRouter
from utilities.user import User
users = APIRouter()


#members
@users.get('/user')
def get_user():
    user = User().users()
    return user

@users.get('/user/name/{user_id}')
def get_user_name(user_id :int):
    user = User().userIdName(user_id)
    return user

@users.get('/user/id/{user_name}')
def get_user_id(user_name :str):
    user = User().userNameId(user_name)
    return user

@users.get('/user/pin/{user_id}')
def get_user_id(user_id :int):
    user = User().pin(user_id)
    return user

@users.put("/user/nickname/{name_old}/{name_new}")
def update_user(name_old :str, name_new :str):
    user = User().update_nickname(name_old, name_new)
    return user

@users.put("/user/{name_old}/{name_new}")
def update_user(name_old :str, name_new :str):
    user = User().update_user(name_old, name_new)
    return user

@users.put("/user/pin/{pin_old}/{pin_new}/{user_id}")
def update_user(pin_old :int, pin_new :int, user_id :int):
    user = User().update_pin(pin_old, pin_new, user_id)
    return user

@users.post("/user/{name}/{pin}")
def add_user(name :str, pin :str):
    user = User().new(name, pin)
    return user

@users.delete("/user/{del_id}")
def del_user(del_id :int):
    user = User().delete(del_id)
    return user
