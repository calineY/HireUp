<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $fillable = [
        'from_user_id',
        'to_user_id',  
    ];
    //user is favorite to many users
    public function isFavorite()
    {
        return $this->hasMany(User::class, "to_user_id");
    }

    //a user has many favorites
    public function addedFavorite()
    {
        return $this->hasMany(User::class, "from_user_id");
    }
}
