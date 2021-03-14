from pydantic import BaseModel
from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator


class Song(models.Model):
    id = fields.IntField(pk=True)
    text = fields.CharField(max_length=50)
    language = fields.CharField(max_length=3)

    class Meta:
        ordering = ["id"]


Song_Pydantic = pydantic_model_creator(Song, name="Song")
SongIn_Pydantic = pydantic_model_creator(Song, name="SongIn", exclude_readonly=True)

# from pydantic import BaseModel
# from tortoise import fields, models
#
#
# class Song(BaseModel):
#     id: int
#     text: str
#     language: str
