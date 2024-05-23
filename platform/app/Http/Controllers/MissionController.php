<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\MissionResource;
use App\Models\Mission;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

final class MissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __invoke(): AnonymousResourceCollection
    {
        return MissionResource::collection(
            Mission::query()
                ->orderBy('title', 'ASC')
                ->get()
        );
    }
}
