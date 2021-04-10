from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator


class Song(models.Model):
    id = fields.IntField(pk=True)
    text = fields.CharField(max_length=50)
    language = fields.CharField(max_length=3)
    creation_date = fields.DatetimeField(auto_now=True)
    author_id = fields.IntField(null=True)

    class Meta:
        ordering = ["id"]


Song_Pydantic = pydantic_model_creator(Song, name="Song")
SongIn_Pydantic = pydantic_model_creator(Song, name="SongIn", exclude_readonly=True)
