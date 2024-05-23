<?php

declare(strict_types=1);

use Illuminate\Testing\Fluent\AssertableJson;

use function Pest\Laravel\get;

describe('Missions controller', function () {
    it('- index send 20 missions resources', function () {

        get('/api/missions')
            ->assertSuccessful()
            ->assertJsonIsArray('data')
            ->assertJson(fn (AssertableJson $json) => $json->has('data', 20)
            );
    });
});
