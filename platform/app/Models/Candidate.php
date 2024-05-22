<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property string $last_name
 * @property string $first_name
 * @property string $email
 * @property Carbon $birthday
 * @property Carbon $updated_at
 * @property Carbon $created_at
 */
final class Candidate extends Model
{
    use HasFactory;

    protected $fillable = ['first_name', 'last_name', 'email', 'birthday'];

    /**
     * Get the attributes that should be cast.
     *
     * @return string[]
     */
    protected function casts(): array
    {
        return [
            'updated_at' => 'datetime:d-m-y',
            'created_at' => 'datetime:d-m-y',
            'birthday' => 'datetime:d-m-y',
        ];
    }
}
