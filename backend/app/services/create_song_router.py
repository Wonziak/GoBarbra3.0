from gtts import gTTS
from fastapi import HTTPException
import subprocess
from backend.app.models.song import Song, Song_Pydantic


async def song_generator(song_id: int):
    try:
        song = await Song_Pydantic.from_queryset_single(Song.get(id=song_id))
        myobj = gTTS(text=song.text, lang=song.language, slow=False)
        fileName = song.text.replace(' ', '_')
        myobj.save('refrains/' + fileName + '.mp3')
        command = 'ffmpeg -y'
        extension = '.mp3'
        songCompPath = 'audio/GoBarbra'
        filter = ' -filter_complex "[0:a] [1:a] concat=n=16:v=0:a=1 [a]" -map [a] -c:a mp3 '
        for i in range(1, 9):
            command = command + ' -i ' + songCompPath + str(i) + extension + ' -i ' + 'refrains/' + fileName + extension
        command += filter + 'results/' + fileName + 'Result.mp3'
        subprocess.call(command, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except:
        raise HTTPException(status_code=400, detail="could not create song")
    raise HTTPException(status_code=200, detail="Song created with id {id}".format(id=song.id))
