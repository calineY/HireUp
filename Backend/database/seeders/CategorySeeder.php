<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([[
            'name' => 'Design',
            'picture_url' => 'design.jpg'
        ],[
            'name' => 'Technology',  
            'picture_url' => 'technology.jpg'
        ],[
            'name' => 'Handyperson',  
            'picture_url' => 'handyperson.jfif'
        ]
        ,[
            'name' => 'Beauty',  
            'picture_url' => 'beauty.jpg'
        ],[
            'name' => 'Education',  
            'picture_url' => 'education.jpg'
        ],[
            'name' => 'Babysitting',  
            'picture_url' => 'babysitting.jpg'
        ],[
            'name' => 'Marketing',  
            'picture_url' => 'marketing.jpg'
        ],[
            'name' => 'Errands',  
            'picture_url' => 'errands.png'
        ],[
            'name' => 'Engineering',  
            'picture_url' => 'engineering.jpg'
        ],[
            'name' => 'Others',  
            'picture_url' => 'others.jpg'
        ]
    ]);
    }
}
