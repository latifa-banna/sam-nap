<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Eloquent\Builder;
class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function index()
    // {
    //    return Product::select('id', 'title',	'description',	'image')->get();
    // // $data = Product::select('id', 'title', 'description', 'image')->get();
    // // return view('welcome', compact('data'));

    // }
  
    
   

    
    public function index($slug = null, $category = null)
    {
        $query = $slug ? Category::whereSlug($slug)->firstOrFail()->products() : Product::query();
    
        if ($category) {
            $query->where('category_id', $category);
        }
    
        $products = $query->with(['category' => function ($query) {
            $query->withTrashed();
        }])->oldest('name')->get();
    
        return $products;
    }
    


    
    
    

        /**
         * Show the form for creating a new resource.
         *
         * @return \Illuminate\Http\Response
         */
// -------------------------------------------------------------------------------------------------------

    public function create()
    {
        return  $categories = Category::all();
        // return view('products.create', compact('categories'));
        
    }
    public function edit($id)
    {
        $product = Product::findOrFail($id);
        $categories = Category::all();
        return view('products.edit', compact('product','categories'));
    }
// --------------------------------------------------------------------------------------------------------
 
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            'category_id' => 'required|exists:categories,id',
        ]);
    
        $product = new Product;
        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->category_id = $request->input('category_id');
    
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('public/images', $filename);
            $product->image = $filename;
        }
        
        $product->save();
    }
    
 
    public function show(Product $product)
    {
        return response()->json([
            'product' => $product
        ]);
    }
 
 
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
            'category_id' => 'required'
        ]);
    
        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->category_id = $request->input('category_id');
    
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('public/images', $filename);
            $product->image = $filename;
        }
    
        $product->save();
    
        return response()->json([
            'message' => 'Item updated successfully'
        ]);
    }
    

 
    public function destroy(Product $product)
    {
        if ($product->image) {
            $exist = Storage::disk('public')->exists("product/image/{$product->image}");
            if ($exist) {
                Storage::disk('public')->delete("product/image/{$product->image}");
            }
        }
        $product->delete();
        return response()->json([
            'message' => 'Item deleted successfully'
        ]);

    }
}
