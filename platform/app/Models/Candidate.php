<?php

declare(strict_types=1);

namespace App\Models;

use App\Observers\CandidateObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Carbon;

/**
 * @property string $last_name
 * @property string $first_name
 * @property-read string $full_name
 * @property string $email
 * @property Carbon $birthday
 * @property-read Collection<int, Mission> $missions
 * @property Carbon $updated_at
 * @property Carbon $created_at
 */
#[ObservedBy([CandidateObserver::class])]
final class Candidate extends Model
{
    use HasFactory;

    protected $fillable = ['first_name', 'last_name', 'email', 'birthday'];

    protected $appends = ['full_name'];

    protected $with = ['missions'];

    /**
     * @return Attribute<string, string>
     */
    public function fullName(): Attribute
    {
        return Attribute::get(fn () => $this->last_name.' '.$this->first_name);
    }

    /**
     * @return BelongsToMany<Mission>
     */
    public function missions(): BelongsToMany
    {
        return $this->belongsToMany(Mission::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return string[]
     */
    protected function casts(): array
    {
        return [
            'updated_at' => 'datetime',
            'created_at' => 'datetime',
            'birthday' => 'datetime',
        ];
    }
}
