from fastapi.responses import StreamingResponse
from fastapi import HTTPException
from Models.song import Song, Song_Pydantic


async def get_song_from_id(song_id: int):
    try:
        obj = await Song_Pydantic.from_queryset_single(Song.get(id=song_id))
        file = open('Results/'+obj.text.replace(' ', '_')+'Result.mp3', mode="rb")
    except:
        raise HTTPException(status_code=404, detail="Song not found")
    return StreamingResponse(file, media_type="audio/mp3")