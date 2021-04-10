from backend.app.models.song import Song, SongIn_Pydantic, Song_Pydantic
from backend.app.models.user import User_Pydantic, User
from backend.app.services.create_song import song_generator
from backend.app.services.get_song import get_song_from_id
from tortoise.contrib.pydantic import pydantic_queryset_creator
from fastapi import HTTPException, APIRouter, Depends
from tortoise.contrib.fastapi import HTTPNotFoundError
from backend.app.routers.users import get_current_user
import datetime

router = APIRouter(tags=['Song'])


@router.get('/song/{song_id}')
async def get_song(song_id: int):
    return await get_song_from_id(song_id)


@router.post('/song')
async def create_song_new(song: SongIn_Pydantic, user: User_Pydantic = Depends(get_current_user)):
    if user.songs_count + 1 <= 10:
        song_obj = await Song.create(text=song.text, language=song.language, author_id=user.id)
        user.songs_count = user.songs_count + 1
        await User.filter(id=user.id).update(**{'songs_count': user.songs_count})
    else:
        oldest = await get_oldest_song(user.id)
        await update_song_in_db(oldest.id, song)
        song_obj = oldest
    await song_generator(song_obj.id)


@router.post('/song/{song_id}')
async def create_song_from_data_in_db(song_id: int):
    await song_generator(song_id)


@router.put('/song/{song_id}', response_model=Song_Pydantic, responses={404: {'model': HTTPNotFoundError}})
async def update_song_in_db(song_id: int, song: SongIn_Pydantic):
    await Song.filter(id=song_id).update(
        **{'text': song.text, 'language': song.language, 'creation_date': datetime.datetime.utcnow()})
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


async def get_oldest_song(user_id: int):
    songs = await Song.filter(author_id=user_id)
    oldest = songs[0]
    for song in songs:
        if oldest.creation_date > song.creation_date:
            oldest = song
    return oldest
