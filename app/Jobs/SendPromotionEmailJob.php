<?php

namespace App\Jobs;

use App\Mail\PromotionMail;
use App\Models\Cake;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Mail;

class SendPromotionEmailJob implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    protected Collection $users;
    protected array $cakes;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->users = User::where('promotion', '=', true)->get();
        $this->cakes = Cake::orderBy('buy_count', 'DESC')->limit(3)->get()->toArray();
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $cakes = $this->cakes;
        $this->users->map(function ($user) use ($cakes) {
            Mail::to($user)->send(new PromotionMail($cakes, $user->name));
        });
    }
}
