from backend.app.models.song import SongIn_Pydantic
from backend.app.models.user import User_Pydantic
from backend.app.services.song import song_generator, get_song_from_id, remove_song, add_song_to_db, update_song, \
    get_users_songs
from fastapi import APIRouter, Depends
from backend.app.routers.users import get_current_user

router = APIRouter(tags=['Song'])


@router.get('/song/{song_id}')
async def get_song(song_id: int, user: User_Pydantic = Depends(get_current_user)):
    return await get_song_from_id(song_id, user.id)


@router.post('/song')
async def create_song_new(song: SongIn_Pydantic, user: User_Pydantic = Depends(get_current_user)):
    song_obj = await add_song_to_db(song, user)
    await song_generator(song_obj.id, user)


@router.patch('/song/{song_id}')
async def create_song_from_data_in_db(song_id: int, user: User_Pydantic = Depends(get_current_user)):
    await song_generator(song_id, user)


@router.put('/song/{song_id}')
async def update_song_in_db(song_id: int, song: SongIn_Pydantic, user: User_Pydantic = Depends(get_current_user)):
    await update_song(song_id, song, user)


@router.get('/songs')
async def get_all_users_songs(user: User_Pydantic = Depends(get_current_user)):
    return await get_users_songs(user)


@router.delete('/song/{song_id}')
async def delete_song_from_db(song_id: int, user: User_Pydantic = Depends(get_current_user)):
    await remove_song(song_id, user)
