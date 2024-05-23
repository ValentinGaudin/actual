<?php

declare(strict_types=1);

use App\Models\Candidate;
use Illuminate\Testing\Fluent\AssertableJson;
use function Pest\Laravel\delete;
use function Pest\Laravel\get;

describe('Candidates controller', function () {
    it( '- index send 10 candidates resources', function () {

        get('/api/candidates')
            ->assertSuccessful()
            ->assertJsonIsArray('data')
            ->assertJson(fn (AssertableJson $json) =>
                $json->has('data', 10)
            )
        ;
    });

    it('- Delete on candidate', function () {
        $candidate = Candidate::query()->first();

        expect($candidate)
            ->toBeInstanceOf(Candidate::class)
            ->not()->toBeEmpty();

        delete('/api/candidates/' . $candidate->id)
            ->assertSuccessful()
            ->assertJsonFragment(['message' => 'Candidate deleted']);

        delete('/api/candidates/' . $candidate->id)
            ->assertNotFound();
    });
});
