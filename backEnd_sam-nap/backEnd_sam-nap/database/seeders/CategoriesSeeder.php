<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use App\Models\Category;
class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        {
            $imagePath = 'C:/Users/Latifa/Programation/React/sam-nap/src/image/joker/2.png'; // Replace with the actual path to your image file
            $imageName = '2.png'; // Replace with the desired name for the image in the storage
            $categoryName = 'gamme fonctionnel'; // Replace with the desired name for the category
    
            // Store the image file
            $storedImage = Storage::disk('public')->putFileAs('categories', $imagePath, $imageName);
    
            // Save the name and image path to the database
            Category::create([
                'name' => $categoryName,
                'image' => $storedImage
            ]);
    }
}
}