<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;


class CategoryController extends Controller
{
    
    /**
     * Display a listing of the resource.
     */
   

     public function index(Request $request)
{
    $query = Category::query();

    // if ($request->has('search')) {
    //     $query->where('name', 'like', '%' . $request->input('search') . '%');
    // }

    return $categories = $query->orderBy('name')->paginate(5);

    // return view('welcome', compact('categories'));
}

     
     


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('categories.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validatedData = $request->validate([
        'name' => 'required|unique:categories|max:255',
        'description' => 'required',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|',
    ]);

    $category =new Category;
    $category->name=$validatedData['name'];
    $category->description=$validatedData['description'];
    $category->slug = Str::slug($validatedData['name']);
    
    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $filename = time() . '.' . $image->getClientOriginalExtension();
        $path = $image->storeAs('public/images', $filename);
        $category->image = $filename;
    }
    $category->save();

    Log::channel('journal')->info('The Category'.'  '.$request->input('name').' created successfully');

    return redirect()->route('categories.index')->with('success', 'Category created successfully.');
}

    /**
     * Display the specified resource.
     */


    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(Category $category)
    // {
    //     return view('categories.edit', compact('category'));
    // }

    /**
     * Update the specified resource in storage.
     */



     public function show(Category $category)
     {
         return response()->json([
             'category' => $category
         ]);
     }

    public function update(Request $request, Category $category)
    {
        $validatedData = $request->validate([
            'name' => 'required|unique:categories,name,' . $category->id . '|max:255',
            'description' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('public/images', $filename);
            $category->image = $filename;
        }

       
        $category->name = $request->input('name');
        $category->description=$request->input('description');
        $category->slug = Str::slug($request->input('name'));
        $category->save();

        return response()->json([
            'message' => 'Item updated successfully'
        ]);
    }

    
    public function destroy(Category $category)
    {
        if ($category->image) {
            $exist = Storage::disk('public')->exists("product/image/{$category->image}");
            if ($exist) {
                Storage::disk('public')->delete("product/image/{$category->image}");
            }
        }
        $category->forceDelete();
        return response()->json([
            'message' => 'Item deleted successfully'
        ]);

    }
}
