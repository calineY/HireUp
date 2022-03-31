<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\User;
use App\Models\Category;
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
            'message' => 'Work profile added',
            'job' => $job
        ], 201);
    }

    public function getProfile(Request $request) {
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
            'user'=>$user,
            'job' => $job
        ], 200);

    }

    public function changeAvailability(Request $request){
        $validator = Validator::make($request->all(), [
            'id'=>'required|numeric',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $job = Job::find($request->id);
        if ($job->user_id == Auth::user()->id){
            if ($job->available==1){
                $job->update(['available' => 0]);
            }else{
                $job->update(['available' => 1]);
            }
            return response()->json([
            'message'=> 'Updated availablity',
            'job' => $job
            ], 201);
        }
        return response()->json([                 
            'message' => "Not updated" 
        ], 401);        
    } 

    public function editJob(Request $request){
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|between:2,100',
            'bio' => 'required|string',
            'rate_per_hour' => 'required|numeric',
            'category_id'=>'required|numeric',
        ]);
        if ($validator->fails()){
            
            return response()->json($validator->errors()->toJson(), 400);

        }
        $user = Auth::user();
        $job=$user->job;
        $job->title = $request->title;
        $job->bio = $request->bio;
        $job->rate_per_hour = $request->rate_per_hour;
        $job->category_id = $request->category_id;

        $job->save();

        return response()->json([
            'message' => 'Job updated',
            'Job' => $job
        ], 202);
    }

    public function getFreelancers(Request $request) {
        $validator = Validator::make($request->all(), [
            'category_id'=>'required|numeric',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $freelancers=Job::join('users', 'users.id', '=', 'jobs.user_id')
        ->where("jobs.category_id", "=", $request->category_id)
        ->where('jobs.available','=',1)
        ->get(['users.name','users.picture_url','users.latitude','users.longitude','jobs.*']);
        return response()->json([
            'message' => 'Success',
            'freelancers'=>$freelancers,
        ], 200);

    }

    public function getCategories() {
        $categories=Category::all();
        return response()->json([
            'categories' => $categories
        ], 200);

    }


}
