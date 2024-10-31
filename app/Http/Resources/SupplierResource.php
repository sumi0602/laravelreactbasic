<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'address'=>$this->address,
            'tax_no'=>$this->tax_no,
            'mobile_no'=>$this->mobile_no,
            'email'=>$this->email,
            'country'=> $this->country,
            'status'=>$this->status,
        ];
    }
}
