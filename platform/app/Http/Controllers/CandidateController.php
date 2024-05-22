<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StoreCandidateRequest;
use App\Http\Requests\UpdateCandidateRequest;
use App\Http\Resources\CandidateResource;
use App\Models\Candidate;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

final class CandidateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        return CandidateResource::collection(Candidate::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCandidateRequest $request): void
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Candidate $candidate): CandidateResource
    {
        return new CandidateResource($candidate);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCandidateRequest $request, Candidate $candidate): void
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Candidate $candidate): void
    {
        //
    }
}
