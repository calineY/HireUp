<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'bio',
        'available',
        'rate_per_hour',
        'category_id',
        'user_id',
    ];

    //every job belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //job categories
    public function category()
    {
        return $this->belongsTo(Job::class);
    }
}
