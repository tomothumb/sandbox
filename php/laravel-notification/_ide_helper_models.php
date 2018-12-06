<?php
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App{
/**
 * App\Post
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\PostComment[] $post_comments
 */
	class Post extends \Eloquent {}
}

namespace App{
/**
 * App\User
 *
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Post[] $posts
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\User[] $user_followings
 */
	class User extends \Eloquent {}
}

namespace App{
/**
 * App\UserFollow
 *
 */
	class UserFollow extends \Eloquent {}
}

namespace App{
/**
 * App\CrawleQueue
 *
 */
	class CrawleQueue extends \Eloquent {}
}

namespace App{
/**
 * App\PostComment
 *
 */
	class PostComment extends \Eloquent {}
}

