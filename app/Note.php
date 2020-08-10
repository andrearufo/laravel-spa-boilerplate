<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = [
        'body', 'user_id'
    ];

    protected $appends = [
        'spa_user'
    ];

    public function getSpaUserAttribute()
    {
        return User::find($this->user_id);
    }
}
