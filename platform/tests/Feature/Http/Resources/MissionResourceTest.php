<?php

declare(strict_types=1);

use App\Http\Resources\CandidateResource;
use App\Http\Resources\MissionResource;
use App\Models\Candidate;
use App\Models\Mission;
use Illuminate\Http\Request;

describe('Mission Resources', function () {
    it('transforms the mission resource into an array correctly', function () {
        $mission = Mission::factory()->make([
            'id' => 1,
            'title' => 'Président',
            'start_date' => '1990-01-01',
            'end_date' => '2100-01-01',
            'created_at' => '2023-05-15 12:00:00',
            'updated_at' => '2023-05-15 12:00:00',
        ]);

        $resource = new MissionResource($mission);
        $response = $resource->toArray(new Request);

        expect($response)->not()->toEqual([
            'id' => 1,
            'title' => 'Président',
            'start_date' => '2100-01-01',
            'end_date' => '1990-01-01',
            'created_at' => '2023-05-15 12:00:00',
            'updated_at' => '2023-05-15 12:00:00',
        ]);
    });
});
