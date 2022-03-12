<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User_type extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    //user type
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
