<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Candidate;

final class CandidateObserver
{
    /**
     * Handle the Candidate "deleted" event.
     */
    public function deleting(Candidate $candidate): void
    {
        $candidate->missions()->sync([]);
    }
}
