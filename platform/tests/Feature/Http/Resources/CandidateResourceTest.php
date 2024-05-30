<?php

declare(strict_types=1);

use App\Http\Resources\CandidateResource;
use App\Http\Resources\MissionResource;
use App\Models\Candidate;
use App\Models\Mission;
use Illuminate\Http\Request;

describe('Candidates Resources', function () {
    it('transforms the candidate resource into an array correctly', function () {
        $mission = Mission::factory()->make([
            'id' => 1,
            'title' => 'Président',
            'start_date' => '1990-01-01',
            'end_date' => '2100-01-01',
            'created_at' => '2023-05-15',
            'updated_at' => '2023-05-15',
        ]);

        $candidate = Candidate::factory()->make([
            'id' => 1,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
            'birthday' => '1990-01-01',
            'nir' => '190156833160653',
            'created_at' => '2023-05-15 12:00:00',
            'updated_at' => '2023-05-15 12:00:00',
        ]);

        $candidate->missions()->sync($mission);

        $resource = new CandidateResource($candidate);
        $response = $resource->toArray(new Request);

        expect($response)->toEqual([
            'id' => 1,
            'last_name' => 'Doe',
            'first_name' => 'John',
            'full_name' => 'Doe John',
            'email' => 'john.doe@example.com',
            'birthday' => '1990-01-01',
            'nir' => '190156833160653',
            'created_at' => '2023-05-15',
            'updated_at' => '2023-05-15',
            'missions' => MissionResource::collection($candidate->missions),
        ]);
    });
});
