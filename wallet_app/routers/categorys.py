from fastapi import APIRouter
from utilities.category import Category

categories = APIRouter()

@categories.get('/categories')
def get_category():
    category = Category().categories()
    return category

@categories.put("/categories/{name_old}/{name_new}")
def update_category(name_old :str, name_new :str):
    category = Category().update(name_old, name_new)
    return category

@categories.post("/categories/{name}")
def add_category(name :str):
    category = Category().new(name)
    return category

@categories.delete("/categories/{del_id}")
def del_category(del_id :int):
    category = Category().delete(del_id)
    return category

