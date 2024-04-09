<?php

namespace App\Jobs;

use App\Events\CakeReviewedEvent;
use App\Mail\CakeReviewed;
use App\Models\Cake;
use App\Models\Review;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Mail;

class SendCakeReviewedMail implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    protected CakeReviewed $mail;
    protected Collection $users;
    protected Review $review;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Cake $cake, string $name, Review $review)
    {
        $this->users = User::where('role_id', '=', config('roles.admin'))->get();
        $this->mail = new CakeReviewed($cake, $name, $review);
        $this->review = $review;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $mail = $this->mail;
        event(new CakeReviewedEvent($this->review));
        $this->users->each(function ($user) use ($mail) {
            Mail::to($user)->send($mail);
        });
    }
}
