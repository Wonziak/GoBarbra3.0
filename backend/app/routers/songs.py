from backend.app.models.song import Song, SongIn_Pydantic, Song_Pydantic
from backend.app.services.create_song_router import song_generator
from backend.app.services.get_song_router import get_song_from_id
from tortoise.contrib.pydantic import pydantic_queryset_creator
from fastapi import HTTPException, APIRouter
from tortoise.contrib.fastapi import HTTPNotFoundError

router = APIRouter()


@router.get('/song/{song_id}')
async def get_song(song_id: int):
    return await get_song_from_id(song_id)


@router.post('/song')
async def create_song_new(song: SongIn_Pydantic):
    obj = await Song.create(**song.dict(exclude_unset=True))
    await song_generator(obj.id)


@router.post('/song/{song_id}')
async def create_song_from_data_in_db(song_id: int):
    await song_generator(song_id)


@router.put('/song/{song_id}', response_model=Song_Pydantic, responses={404: {'model': HTTPNotFoundError}})
async def update_song_in_db_and_create(song_id: int, song: SongIn_Pydantic):
    await Song.filter(id=song_id).update(**song.dict(exclude_unset=True))
    return await Song_Pydantic.from_queryset_single(Song.get(id=song_id))


@router.get('/songs')
async def get_all_songs():
    Song_List = pydantic_queryset_creator(Song)
    return await Song_List.from_queryset(Song.all())


@router.delete('/song/{song_id}')
async def delete_song_from_db(song_id: int):
    delete_song = await Song.filter(id=song_id).delete()
    if not delete_song:
        raise HTTPException(status_code=404, detail="cannot find song in database")
    raise HTTPException(status_code=200, detail="song with id {id} deleted".format(id=song_id))
