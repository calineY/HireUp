<?php

namespace App\Http\Controllers;
use App\Models\Review;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\Auth;

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
}
