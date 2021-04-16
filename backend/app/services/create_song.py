from gtts import gTTS
from pydub import AudioSegment
from fastapi import HTTPException
from backend.app.models.song import Song, Song_Pydantic
import os


async def song_generator(song_id: int):
    try:
        song = await Song_Pydantic.from_queryset_single(Song.get(id=song_id))
        myobj = gTTS(text=song.text, lang=song.language, slow=False)
        dirname = os.path.dirname(__file__)
        fileName = str(song.id)
        myobj.save(os.path.join(dirname, '../refrains/{file}.mp3'.format(file=fileName)))
        concat_parts(fileName, dirname)
    except HTTPException:
        raise HTTPException(status_code=400, detail="could not create song")
    raise HTTPException(status_code=200, detail="Song created with id {id}".format(id=song.id))


def concat_parts(fileName, dirname):
    fragments = []
    for i in range(2, 9):
        fragments.append(AudioSegment.from_mp3(os.path.join(dirname, '../audio/GoBarbra{i}.mp3'.format(i=i))))
        fragments.append(AudioSegment.from_mp3(os.path.join(dirname, '../refrains/{file}.mp3'.format(file=fileName))))
    sound = AudioSegment.from_mp3(os.path.join(dirname, '../audio/GoBarbra1.mp3')) + AudioSegment.from_mp3(
        os.path.join(dirname, '../refrains/{file}.mp3'.format(file=fileName)))
    for i in range(0, 14):
        sound = sound + fragments[i]
    sound.export(os.path.join(dirname, '../results/{file}Result.mp3'.format(file=fileName)), format="mp3")

    # def multiple_replace(text):
    #     replaces = {"-": "_", "+": "_", ":": "_", ".": "_"," ":"_"}
    #     regex = re.compile("(%s)" % "|".join(map(re.escape, replaces.keys())))
    #     return regex.sub(lambda mo: replaces[mo.string[mo.start():mo.end()]], text)
