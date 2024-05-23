<?php

namespace App\Observers;

use App\Models\Candidate;

class CandidateObserver
{
    /**
     * Handle the Candidate "deleted" event.
     */
    public function deleting(Candidate $candidate): void
    {
        $candidate->missions()->sync([]);
    }

    /**
     * Handle the Candidate "force deleted" event.
     */
    public function forceDeleted(Candidate $candidate): void
    {
        dd('stop');
    }
}
