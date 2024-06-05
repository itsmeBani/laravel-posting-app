<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Contracts\Auth\Authenticatable;
use Laravel\Sanctum\HasApiTokens;

use Illuminate\Notifications\Notifiable;

use Illuminate\Foundation\Auth\User as AuthenticatableUser;
class User extends AuthenticatableUser implements Authenticatable
{
    use  HasFactory,HasApiTokens , Notifiable;
    protected $table = 'user_data'; // Assuming your table name is 'users'

    protected $fillable = [

        'last_name',
        'first_name',
        'date_of_birth',
        'phone_number',
        'email',

        'password',
        'profile_picture'
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'id'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function posts()
    {
        return $this->hasMany(Post::class);
    }


}
