import uvicorn
from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from backend.app.routers import songs, users
from fastapi.middleware.cors import CORSMiddleware
from backend.app.settings import postgres_user, postgres_password, get_ip

def connect_to_db():
    register_tortoise(
        app,
        db_url='postgres://{user}:{password}@{ip}:5432/postgres'.format(user=postgres_user,
                                                                        password=postgres_password, ip=get_ip()),
        modules={'models': ['backend.app.models.song', 'backend.app.models.user']},
        generate_schemas=True,
        add_exception_handlers=True
    )


app = FastAPI()
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(songs.router)
app.include_router(users.router)

connect_to_db()

if __name__ == "__main__":
    uvicorn.run("gobarbra3:app", host="localhost", port=8000, log_level="info", reload=True)
