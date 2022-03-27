<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\FavoriteController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['auth:api']], function () {
    
    
    Route::group(['prefix' => 'auth'], function ($router) {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/refresh', [AuthController::class, 'refresh']);
    });

    Route::group(['prefix' => 'user'], function ($router) {
        Route::get('/profile', [AuthController::class, 'userProfile']); 
        Route::post('/job', [JobController::class, 'addWorkProfile']);  
        Route::get('/getprofile', [JobController::class, 'getProfile']);   
        Route::post('/review', [ReviewController::class, 'addReview']);  
        Route::get('/reviews', [ReviewController::class, 'getReviews']);  
        Route::post('/reviews', [ReviewController::class, 'deleteReview']);  
        Route::post('/favorite', [FavoriteController::class, 'addFavorite']);  
        Route::post('/favorites', [FavoriteController::class, 'deleteFavorite']);  
        Route::get('/favorites', [FavoriteController::class, 'getFavorites']);  
        Route::post('/available', [JobController::class, 'changeAvailability']);  
        Route::post('/profile', [AuthController::class, 'editProfile']); 
        Route::post('/editjob', [JobController::class, 'editJob']);  

    });
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('/login', [AuthController::class, 'login'])->name('auth-login');
    Route::post('/register', [AuthController::class, 'register']);
    Route::get('/notfound', [AuthController::class, 'notFound'])->name('not-found');
});
