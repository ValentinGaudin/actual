<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Candidate;
use Carbon\Carbon;
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
            'birthday' => Carbon::parse($this->birthday)->format('d-M-Y'),
            'missions' => MissionResource::collection($this->missions),
            'updated_at' => Carbon::parse($this->updated_at)->format('d/m/y H:i'),
            'created_at' => Carbon::parse($this->created_at)->format('d/m/y H:i'),
        ];
    }
}
