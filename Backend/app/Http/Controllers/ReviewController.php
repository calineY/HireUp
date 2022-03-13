<?php

namespace App\Http\Controllers;
use App\Models\Review;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class ReviewController extends Controller
{
    public function addReview(Request $request) {
        $validator = Validator::make($request->all(), [
            'to_user_id' => 'required|numeric',
            'rating' => 'required|numeric',
            'review' => 'required|string',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $review = Review::create(array_merge(
            ['from_user_id' => auth()->user()->id],
            $validator->validated()  
        ));
        return response()->json([
            'message' => 'Review added',
            'review' => $review
        ], 201);
    }

    public function getReviews(Request $request) {
        $validator = Validator::make($request->all(), [
            'user_id'=>'required|numeric',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $user=User::find($request->user_id);
        $reviews=$user->recievedReview()->get();
        return response()->json([
            'message' => 'Success',
            'reviews' => $reviews
        ], 200);

    }
}
