import uvicorn
from gtts import gTTS
from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from app.routers import songs
from starlette.responses import RedirectResponse

app = FastAPI()
app.include_router(songs.router)


@app.get('/') #tylko dla wygody, żeby odrazu na swaggera weszło
async def redirect():
    return RedirectResponse(url='/docs', status_code=302)


register_tortoise(
    app,
    db_url="sqlite://store.db",
    modules={'models': ['app.models.song']},
    generate_schemas=True,
    add_exception_handlers=True
)

if __name__ == "__main__":
    uvicorn.run("gobarbra3:app", host="localhost", port=8000, log_level="info", reload=True)
