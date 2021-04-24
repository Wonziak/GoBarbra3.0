from backend.app.models.user import User, User_Pydantic


async def change_songs_count(user: User_Pydantic, count: int):
    user.songs_count = user.songs_count + count
    await User.filter(id=user.id).update(**{'songs_count': user.songs_count})
