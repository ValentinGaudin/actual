<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\UpdateCandidateRequest;
use App\Http\Resources\CandidateResource;
use App\Models\Candidate;
use App\Objects\Values\CandidateValuesObject;
use Illuminate\Http\JsonResponse;
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
     * Display the specified resource.
     */
    public function show(Candidate $candidate): CandidateResource
    {
        return new CandidateResource($candidate);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCandidateRequest $request, Candidate $candidate): JsonResponse
    {
        $candidateObject = CandidateValuesObject::make($request);

        $missions = $candidateObject->getMissions();

        $candidate->missions()->sync($missions);

        $candidate->update($candidateObject->jsonSerialize());

        return response()->json(['message' => 'Candidate Updated']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Candidate $candidate): JsonResponse
    {
        return response()->json(['message' => $candidate->delete() ? 'Candidate deleted' : 'Candidate not deleted']);
    }
}
