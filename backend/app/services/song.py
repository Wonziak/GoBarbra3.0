from gtts import gTTS
from pydub import AudioSegment
from fastapi import HTTPException
from fastapi.responses import StreamingResponse
from backend.app.models.song import Song, Song_Pydantic, SongIn_Pydantic
from backend.app.models.user import User_Pydantic
from backend.app.services.user import change_songs_count
from tortoise.contrib.pydantic import pydantic_queryset_creator
import os
import datetime


async def song_generator(song_id: int, user: User_Pydantic):
    song = await Song_Pydantic.from_queryset_single(Song.get(id=song_id, author_id=user.id))
    if not song:
        raise HTTPException(status_code=400, detail="could not create song")
    else:
        refrain = gTTS(text=song.text, lang=song.language, slow=False)
        dirname = os.path.dirname(__file__)
        fileName = str(song.id)
        refrain.save(os.path.join(dirname, '../refrains/{file}.mp3'.format(file=fileName)))
        __concat_parts(fileName, dirname)
        raise HTTPException(status_code=200, detail="Song created with id {id}".format(id=song.id))


async def get_song_from_id(song_id: int, user_id: int):
    obj = await Song_Pydantic.from_queryset_single(Song.get(id=song_id, author_id=user_id))
    if not obj:
        raise HTTPException(status_code=404, detail="Song not found in db")
    dirname = os.path.dirname(__file__)
    if os.path.exists(os.path.join(dirname, '../results/{id}Result.mp3'.format(id=song_id))):
        file = open(os.path.join(dirname, '../results/{id}Result.mp3'.format(id=obj.id)), mode="rb")
        return StreamingResponse(file, media_type="audio/mp3")
    else:
        raise HTTPException(status_code=404, detail="Song file not found")


async def add_song_to_db(song: SongIn_Pydantic, user: User_Pydantic):
    if user.songs_count + 1 <= 10:
        song_obj = await Song.create(text=song.text, language=song.language, author_id=user.id)
        if song_obj:
            await change_songs_count(user, 1)
            return song_obj
        else:
            raise HTTPException(status_code=400, detail="could not create song")
    else:
        oldest = await __get_oldest_song(user.id)
        return await update_song(oldest.id, song, user)


async def update_song(song_id: int, song: SongIn_Pydantic, user: User_Pydantic):
    song_obj = await Song.filter(id=song_id, author_id=user.id).update(
        **{'text': song.text, 'language': song.language, 'creation_date': datetime.datetime.utcnow()})
    if song_obj:
        return song_obj
    else:
        raise HTTPException(status_code=404, detail="Song not found")


async def remove_song(song_id: int, user: User_Pydantic):
    song_to_delete = await Song.filter(id=song_id, author_id=user.id)
    if not song_to_delete:
        raise HTTPException(status_code=404, detail="cannot find song in database")
    else:
        await change_songs_count(user, -1)
        result_deleted = False
        refrain_deleted = False
        dirname = os.path.dirname(__file__)
        refrain_path = os.path.join(dirname, '../refrains/{file}.mp3'.format(file=song_id))
        result_path = os.path.join(dirname, '../results/{file}Result.mp3'.format(file=song_id))
        if os.path.exists(refrain_path):
            os.remove(os.path.join(dirname, '../refrains/{file}.mp3'.format(file=str(song_id))))
            refrain_deleted = True
        if os.path.exists(result_path):
            os.remove(os.path.join(dirname, '../results/{file}Result.mp3'.format(file=str(song_id))))
            result_deleted = True
        if result_deleted is True and refrain_deleted is True:
            await Song.filter(id=song_id, author_id=user.id).delete()
            raise HTTPException(status_code=200, detail="song with id {id} deleted".format(id=song_id))
        else:
            await Song.filter(id=song_id, author_id=user.id).delete()
            raise HTTPException(status_code=404,
                                detail="song {id} deleted from DB but components not found".format(id=song_id))


async def get_users_songs(user: User_Pydantic):
    Song_List = pydantic_queryset_creator(Song)
    return await Song_List.from_queryset(Song.filter(author_id=user.id))


async def __get_oldest_song(user_id: int):
    songs = await Song.filter(author_id=user_id)
    oldest = songs[0]
    for song in songs:
        if oldest.creation_date > song.creation_date:
            oldest = song
    return oldest


def __concat_parts(filename, dirname):
    fragments = []
    for i in range(2, 9):
        fragments.append(AudioSegment.from_mp3(os.path.join(dirname, '../audio/GoBarbra{i}.mp3'.format(i=i))))
        fragments.append(AudioSegment.from_mp3(os.path.join(dirname, '../refrains/{file}.mp3'.format(file=filename))))
    sound = AudioSegment.from_mp3(os.path.join(dirname, '../audio/GoBarbra1.mp3')) + AudioSegment.from_mp3(
        os.path.join(dirname, '../refrains/{file}.mp3'.format(file=filename)))
    for i in range(0, 14):
        sound = sound + fragments[i]
    sound.export(os.path.join(dirname, '../results/{file}Result.mp3'.format(file=filename)), format="mp3")
