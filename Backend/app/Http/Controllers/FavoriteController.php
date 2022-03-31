<?php

namespace App\Http\Controllers;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class FavoriteController extends Controller
{
    public function addFavorite(Request $request) {
        $validator = Validator::make($request->all(), [
            'to_user_id' => 'required|numeric',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $favorite = Favorite::create(array_merge(
            ['from_user_id' => auth()->user()->id],
            $validator->validated()  
        ));
        return response()->json([
            'message' => 'Added to favorites',
            'favorite' => $favorite
        ], 201);
    }

    public function getFavorites(Request $request) {
        $favorites= Favorite::join('users', 'users.id', '=', 'favorites.to_user_id')
        ->join('jobs', 'favorites.to_user_id', '=', 'jobs.user_id')
        ->where("favorites.from_user_id", "=", Auth::user()->id)
        ->get(['users.name','users.picture_url','jobs.*']);
        return response()->json([
            'message' => 'Success',
            'favorites' => $favorites
        ], 200);
    }

    public function deleteFavorite(Request $request) {
        $validator = Validator::make($request->all(), [
            'user_id'=>'required|numeric',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $favorite=Favorite::where('to_user_id','=',$request->user_id)->where('from_user_id','=',Auth::user()->id)->delete();
        return response()->json([
            'message' => 'Removed from favorites',
            'favorite' => $favorite
        ], 200);
        
    }

}
