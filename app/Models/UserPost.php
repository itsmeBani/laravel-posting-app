<?php
// app/Models/UserData.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPost extends Model
{
    protected $table = 'user_data';
    protected $hidden = [


        'date_of_birth',
        'phone_number',

        'password',

    ];

    public function posts()
    {
        return $this->hasMany(Post::class, 'user_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'user_id');
    }
}
