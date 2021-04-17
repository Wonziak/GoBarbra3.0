import uvicorn
from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from backend.app.routers import songs, users
from starlette.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

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


@app.get('/')  # tylko dla wygody, żeby odrazu na swaggera weszło
async def redirect():
    return RedirectResponse(url='/docs', status_code=302)


try:
    register_tortoise(
        app,
        db_url="postgres://postgres:postgres@172.17.0.1:5432/postgres",
        modules={'models': ['backend.app.models.song', 'backend.app.models.user']},
        generate_schemas=True,
        add_exception_handlers=True
    )
except ConnectionRefusedError:
    register_tortoise(
        app,
        db_url="postgres://postgres:postgres@localhost:5432/postgres",
        modules={'models': ['backend.app.models.song', 'backend.app.models.user']},
        generate_schemas=True,
        add_exception_handlers=True
    )

if __name__ == "__main__":
    uvicorn.run("gobarbra3:app", host="localhost", port=8000, log_level="info", reload=True)
