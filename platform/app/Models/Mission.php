<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Carbon;

/**
 * @property string $title
 * @property Carbon $start_date
 * @property Carbon $end_date
 * @property-read Collection<int, Candidate> $candidates
 * @property Carbon $updated_at
 * @property Carbon $created_at
 */
final class Mission extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'start_date', 'end_date'];

    /**
     * All of the relationships to be touched.
     *
     * @var string[]
     */
    protected $touches = ['candidates'];

    /**
     * @return BelongsToMany<Candidate>
     */
    public function candidates(): BelongsToMany
    {
        return $this->belongsToMany(Candidate::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return string[]
     */
    protected function casts(): array
    {
        return [
            'start_date' => 'datetime',
            'end_date' => 'datetime',
            'updated_at' => 'datetime',
            'created_at' => 'datetime',
        ];
    }
}
