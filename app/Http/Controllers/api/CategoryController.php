<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Validation\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Http\Resources\CategoryResource;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return CategoryResource::collection(Category::query()->orderBy( 'id', 'desc' )->paginate( 10 ) );

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        //
        try {
            
            $data = $request->validated();
            
            if($request->hasFile('photo')) {
                $image = $request->file('photo');
                $name = time().rand(1, 99999) . '.' . $image->getClientOriginalExtension();
                $data['photo']=$name;
                $image_path = Storage::disk('public')->putFile('/images/', $image);

            }
            $category = Category::create( $data );
            return response( new CategoryResource( $category ), 201 );
        }
        catch(Exception $e){
            throw new Exception($e->getmessage());
        }
       
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
        return new CategoryResource( $category );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        //
        $data = $request->validated();
        $category->update( $data );
        return new CategoryResource( $category );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
        $category->delete();
        return response( '', 204 );
    }
}
