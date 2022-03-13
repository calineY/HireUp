<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\User;
use Validator;
use Illuminate\Support\Facades\Auth;

class JobController extends Controller
{
    public function addWorkProfile(Request $request) {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|between:2,100',
            'bio' => 'required|string',
            'available' => 'numeric',
            'rate_per_hour' => 'required|numeric',
            'category_id'=>'required|numeric',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $job = Job::create(array_merge(
            $validator->validated(),
            ['user_id' => auth()->user()->id]
        ));
        return response()->json([
            'message' => 'Work profile successfully registered',
            'job' => $job
        ], 201);
    }

    public function getWorkProfile(Request $request) {
        $validator = Validator::make($request->all(), [
            'user_id'=>'required|numeric',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $user=User::find($request->user_id);
        $job=$user->job()->get();
        return response()->json([
            'message' => 'Success',
            'job' => $job
        ], 200);

    }
}
