from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator
from passlib.hash import bcrypt


class User(models.Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(50, unique=True)
    password_hash = fields.CharField(255)
    email = fields.CharField(128)
    songs_count = fields.IntField(default=0, null=True)

    def verify_password(self, password):
        return bcrypt.verify(password, self.password_hash)


User_Pydantic = pydantic_model_creator(User, name="User")
UserIn_Pydantic = pydantic_model_creator(User, name="UserIn", exclude_readonly=True)
