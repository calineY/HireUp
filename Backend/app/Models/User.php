<?php
namespace App\Models;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone_number',
        'picture_url',
        'latitude',
        'longitude',
        'user_type_id',
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    
    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier() {
        return $this->getKey();
    }
    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims() {
        return [];
    }    

    //a user can have one job
    public function job()
    {
        return $this->hasOne(Job::class);
    }

    //reviews to that user
    public function recievedReview()
    {
        return $this->hasMany(Review::class, "to_user_id");
    }

    //reviews created by the user
    public function addedReview()
    {
        return $this->hasMany(Review::class, "from_user_id");
    }

    //user is favorite to many users
    public function isFavorite()
    {
        return $this->hasMany(Favorite::class, "to_user_id");
    }

    //a user has many favorites
    public function addedFavorite()
    {
        return $this->hasMany(Favorite::class, "from_user_id");
    }

    //user type
    public function userType()
    {
        return $this->belongsTo(User_type::class);
    }
}