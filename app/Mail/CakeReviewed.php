<?php

namespace App\Mail;

use App\Models\Cake;
use App\Models\Review;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CakeReviewed extends Mailable implements ShouldQueue
{
    use Queueable;
    use SerializesModels;

    protected Cake $cake;
    protected $name;
    protected Review $review;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Cake $cake, $name, Review $review)
    {
        $this->cake = $cake;
        $this->$name = $name;
        $this->review = $review;
        $this->locale(app()->getLocale());
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('Mails.CakeReviewed', [
            'cake' => $this->cake,
            'review' => $this->review,
            'name' => $this->name,
        ]);
    }
}
