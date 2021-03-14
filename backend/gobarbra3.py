import uvicorn
from fastapi import FastAPI, HTTPException
from Models.song import Song, SongIn_Pydantic, Song_Pydantic
from Routers.create_song_router import song_generator
from Routers.get_song_router import get_song_from_id
from starlette.responses import RedirectResponse
from tortoise.contrib.fastapi import HTTPNotFoundError, register_tortoise
from tortoise.contrib.pydantic import pydantic_queryset_creator

app = FastAPI()


@app.get('/song/{song_id}')
async def get_song(song_id: int):
    return await get_song_from_id(song_id)


@app.post('/song')
async def create_song_new(song: SongIn_Pydantic):
    obj = await Song.create(**song.dict(exclude_unset=True))
    await song_generator(obj.id)


@app.post('/song/{song_id}')
async def create_song_from_data_in_db(song_id: int):
    await song_generator(song_id)


@app.get('/')
async def redirect():
    return RedirectResponse(url='/docs', status_code=302)


@app.put('/song/{song_id}', response_model=Song_Pydantic, responses={404: {'model': HTTPNotFoundError}})
async def update_song_in_db_and_create(song_id: int, song: SongIn_Pydantic):
    await Song.filter(id=song_id).update(**song.dict(exclude_unset=True))
    return await Song_Pydantic.from_queryset_single(Song.get(id=song_id))


@app.get('/songs')
async def get_all_songs():
    Song_List = pydantic_queryset_creator(Song)
    return await Song_List.from_queryset(Song.all())


@app.delete('/song/{song_id}')
async def delete_song_from_db(song_id: int):
    delete_song = await Song.filter(id=song_id).delete()
    if not delete_song:
        raise HTTPException(status_code=404, detail="cannot find song in database")
    raise HTTPException(status_code=200, detail="song with id {id} deleted".format(id=song_id))


register_tortoise(
    app,
    db_url="sqlite://store.db",
    modules={'models': ['Models.song']},
    generate_schemas=True,
    add_exception_handlers=True
)

if __name__ == "__main__":
    uvicorn.run("gobarbra3:app", host="localhost", port=8000, log_level="info", reload=True)
