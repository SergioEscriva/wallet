from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.users import users
from routers.wallets import wallets
from routers.transactions import transactions
from routers.categorys import categories
from routers.settles import settles
from utilities.sqlitedb import Database

#uvicorn app:app --reload
app = FastAPI()
origins = ["*"]
'''
origins = [
    "http://127.0.0.1:9000",
    "http://localhost:9000",
]
'''

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users)
app.include_router(wallets)
app.include_router(transactions)
app.include_router(categories)
app.include_router(settles)

@app.post("/file")
async def upload_file(file):
    name_file = file
    print (name_file)
    return name_file
