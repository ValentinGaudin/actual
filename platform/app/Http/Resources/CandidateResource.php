<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Candidate
 */
final class CandidateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->getKey(),
            'last_name' => $this->last_name,
            'first_name' => $this->first_name,
            'full_name' => $this->full_name,
            'email' => $this->email,
            'birthday' => $this->birthday->format('Y-m-d'),
            'missions' => MissionResource::collection($this->missions),
            'updated_at' => $this->updated_at->format('Y-m-d'),
            'created_at' => $this->created_at->isoFormat('Y-m-d'),
        ];
    }
}
