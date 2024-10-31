<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Country;

class Supplier extends Model
{
    use HasFactory;

    protected $table = 'supplier';
    protected $with = ['countries'];
    
    protected $fillable = [
        'name',
        'address',
        'tax_no',
        'status',
        'mobile_no',
        'country',
        'email'
    ];

    public function countries() {
        return $this->belongsTo('App\Models\Country','country');
    }
}
