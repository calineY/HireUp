<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    //reviews to that user
    public function recievedReview()
    {
        return $this->belongsTo(User::class, "to_user_id");
    }

    //reviews created by the user
    public function addedReview()
    {
        return $this->belongsTo(User::class, "from_user_id");
    }
}
