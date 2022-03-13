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

    // public function getReviews(Request $request) {
    //     $validator = Validator::make($request->all(), [
    //         'user_id'=>'required|numeric',
    //     ]);
    //     if($validator->fails()){
    //         return response()->json($validator->errors()->toJson(), 400);
    //     }
    //     $reviews= Review::join('users', 'users.id', '=', 'reviews.from_user_id')
    //     ->where("reviews.to_user_id", "=", $request->user_id)
    //     ->get(['users.name','users.picture_url','reviews.*']);
    //     return response()->json([
    //         'message' => 'Success',
    //         'reviews' => $reviews
    //     ], 200);
    // }

    // public function deleteReview(Request $request) {
    //     $validator = Validator::make($request->all(), [
    //         'id'=>'required|numeric',
    //     ]);
    //     if($validator->fails()){
    //         return response()->json($validator->errors()->toJson(), 400);
    //     }
    //     $review=Review::find($request->id);
    //     if($review->from_user_id==Auth::user()->id){
    //         $review->delete();
    //         return response()->json([
    //             'message' => 'Review deleted',
    //             'review' => $review
    //         ], 200);
    //     }
        
    //     return response()->json([
    //         'message' => 'Action not allowed',
    //     ], 200);
    // }

}
