<?php

declare(strict_types=1);

use App\Http\Resources\CandidateResource;
use App\Models\Candidate;
use Illuminate\Http\Request;

describe('Candidates Resources', function () {
    it('transforms the candidate resource into an array correctly', function () {
        $candidate = Candidate::factory()->make([
            'id' => 1,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'full_name' => 'Doe John',
            'email' => 'john.doe@example.com',
            'birthday' => '1990-01-01',
            'created_at' => '2023-05-15 12:00:00',
            'updated_at' => '2023-05-15 12:00:00',
        ]);

        $resource = new CandidateResource($candidate);
        $response = $resource->toArray(new Request);

        expect($response)->toEqual([
            'id' => 1,
            'last_name' => 'Doe',
            'first_name' => 'John',
            'full_name' => 'Doe John',
            'email' => 'john.doe@example.com',
            'birthday' => '1990-01-01',
            'created_at' => '2023-05-15',
            'updated_at' => '2023-05-15',
        ]);
    });
});
