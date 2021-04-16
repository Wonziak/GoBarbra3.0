from fastapi.responses import StreamingResponse
from fastapi import HTTPException
from backend.app.models.song import Song, Song_Pydantic
import os

async def get_song_from_id(song_id: int):
    try:
        obj = await Song_Pydantic.from_queryset_single(Song.get(id=song_id))
        dirname = os.path.dirname(__file__)
        file = open(os.path.join(dirname, '../results/{id}Result.mp3'.format(id=obj.id)), mode="rb")
    except:
        raise HTTPException(status_code=404, detail="Song not found")
    return StreamingResponse(file, media_type="audio/mp3")
